'use server';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';

import { registerBodyProps, loginBodyProps } from '@/Types/route';

import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import { generateResetPasswordToken, generateTwoFactorToken } from '@/lib/tokens';
import { sendResetPasswordEmail, sendTwoFactorEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/TwoFactorToken';
import { getTwoFactorConfirmationByUserId } from '@/data/TwoFactorConfirmation';
import { getResetPasswordTokenByToken } from '@/data/ResetPasswordToken';

export async function Register(body: registerBodyProps){
    if(body.createPassword !== body.repeatPassword){
        return {ok: false, error: 'The fields Create Password and Repeat Password are different', status: 400};
    }

    const hashedPassword = await bcrypt.hash(body.createPassword, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email: body.email,
        }
    })

    if(existingUser) {
        return ({ ok: false,  error: 'User already Registered', status: 422 });
    }

    await db.user.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            dateBirth: body.dateBirth,
            phoneNumber: body.phoneNumber,
            email: body.email,
            createPassword: hashedPassword,
            repeatPassword: hashedPassword,
            UserPlanID: null,
            userClassesID: []
        }
    });
    
    return ({ ok: true,  success: 'User Registered', status: 201 });
}

export async function Login(body: loginBodyProps){
    const { email, password, code } = body;
    const existingUser = await getUsersByEmail(email);

    if(existingUser?.isTwoFactorAuth){
        if(code){
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if(!twoFactorToken || twoFactorToken.token !== code){
                return { error: "Invalid Code!", status: 400, ok: false};
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if(hasExpired){
                return { error: "Code Expired!", status: 400, ok: false};
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id },
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if(existingConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id,
                    }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            });
        }else{
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorEmail(
                twoFactorToken.email,
                twoFactorToken.token
            );

            return { twoFactor: true, error: "Code Sent!", status: 200, ok: true};
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });
        return {success: 'Email Sent!', status: 200, ok: true};
    } catch(error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!", status: 422, ok: false};
                default:
                    return { error: "Something went wrong!", status: 400, ok: false };
            }
        }
        throw error;
    }
}

export async function reset(email: string){
    if(!email){
        return { error: 'Email is Required!', status: 400, ok: false };
    }

    const existingUser = await getUsersByEmail(email);

    if(!existingUser){
        return { error: 'Email Not Found!', status: 422, ok: false };
    }

    const passwordResetToken = await generateResetPasswordToken(email);

    await sendResetPasswordEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: 'Reset Email Sent!', status: 200, ok: true };
}

export async function newPassword(password: string, token: string | null){
    if(!token){
        return { error: 'Missing Token!', status: 400, ok: false };
    }

    if(!password){
        return { error: 'Password is required!', status: 400, ok: false };
    }

    const existingToken = await getResetPasswordTokenByToken(token);

    if(!existingToken){
        return { error: 'Invalid Token!', status: 400, ok: false };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return { error: 'Token has Expired!', status: 400, ok: false };
    }

    const existingUser = await getUsersByEmail(existingToken.email);

    if(!existingUser){
        return { error: 'Email not Found!', status: 422, ok: false };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const update = await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            createPassword: hashedPassword,
            repeatPassword: hashedPassword
        }
    });

    const deleteToken = await db.passwordResetToken.delete({
        where: { 
            id: existingToken.id
            }
    })

    if(update && deleteToken){
        return { success: 'Password Updated Successfully!', status: 200, ok: true };
    }
}

export async function updateUserPlan(userId: string, selectedPlan: {
    id: number,
    level: string,
    price: number,
    planAcesses: [{
        id: string,
        string: string
    }]
}){
    const searchUser = await getUsersById(userId);

    if(searchUser){
        const update = await db.user.update({
            where: { id: userId },
            data: {
                UserPlanID: selectedPlan.id as number,
            }
        });
        if(update){ 
            return ({success: 'Plan Added Successfully', status: 200, ok: true});
        }
        return ({error: "Error Adding Plan", status: 422, ok: false});
    }else {
        return ({error: "User Not Found", status: 422, ok: false});
    }
}

export async function updateUserClasses(userId: string, selectedClass: {
    id: number,
    type: string,
    src: string,
    schedule: string,
    ClassDesc:string
}){
    const searchUser = await getUsersById(userId);
    const existingClass = searchUser?.userClassesID.find(( id ) => id === selectedClass.id);

    if(existingClass){
        return ({error: "User Already Subscribed to this class!", status: 400, ok: false});
    }

    if(searchUser?.UserPlanID === null){
        return ({error: "Needs a plan to subscribe to a class!", status: 400, ok: false});
    }

    if(searchUser){
        const update = await db.user.update({
            where: { id: userId },
            data: {
                userClassesID: {
                    push: selectedClass.id,
                },
            }
        });
        if(update) {
            return ({success: 'Class Added Successfully', status: 200, ok: true});
        }
        return ({error: "Error Adding Class", status: 400, ok: false});
    }else {
        return ({error: "None Users Logged or Class Selected", status: 422, ok: false});
    }
}

export async function updateUserData(body: {
    firstName?: string, 
    lastName?: string, 
    email?: string, 
    password: string, 
    newPassword?: string | undefined, 
    removePlan?: boolean, 
    twoFactorAuth?: boolean 
}){
    const session = await auth();
    const currentUserEmail = session?.user?.email;

    const currentUser = await getUsersByEmail(currentUserEmail as string);

    if(!currentUser){
        return ({error: "Unauthorized!", status: 422, ok: false});
    }

    const dbUser = await getUsersById(currentUser!.id);

    if(!dbUser){
        return ({error: "Unauthorized!", status: 422, ok: false});
    }

    let { firstName, lastName, email, password, newPassword, removePlan, twoFactorAuth } = body;

    if(!password){
        return ({error: "Password is a required field!", status: 422, ok: false});
    }

    if(email && email !== currentUser!.email){
        const existingUser = await getUsersByEmail(email as string);

        if(existingUser && existingUser.id !== currentUser.id){
            return ({error: "Email already in use!", status: 400, ok: false});
        }
    }

    if(!newPassword){
        newPassword = password;
    }

    if(password && newPassword){
        const passwordMatch = await bcrypt.compare(
            password,
            dbUser.createPassword
        );

        if(!passwordMatch){
            return ({error: "Wrong Password!", status: 400, ok: false});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        password = hashedPassword;
        newPassword = undefined;
    }

    const update = await db.user.update({
        where: { id: dbUser!.id },
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            createPassword: password,
            repeatPassword: password,
            isTwoFactorAuth: twoFactorAuth,
            UserPlanID: removePlan ? null : dbUser.UserPlanID,
            userClassesID: removePlan ? [] : dbUser.userClassesID,
        }
    });

    if(update) return ({success: 'Settings Updated!', status: 200, ok: true});
}

export async function getUsersByEmail(email: string){
    try {
        const user = await db.user.findUnique({ 
            where: { 
                email: email,
            } 
        });

        return user || null;
    } catch (err) {
        console.log('Error: ', err);
        return null;
    }
}

export async function getUsersById(id: string){
    try {
        const user = await db.user.findUnique({ 
            where: { 
                id: id,
            } 
        });

        return user || null;
    } catch (err) {
        console.log('Error: ', err);
        return null;
    }
}
