import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import { db } from './db';

import { getTwoFactorTokenByEmail } from '@/data/TwoFactorToken';
import { getResetPasswordTokenByEmail } from '@/data/ResetPasswordToken';

export const generateResetPasswordToken = async (email: string) => {
    const token = uuidv4();
    const expires =  new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getResetPasswordTokenByEmail(email);

    if(existingToken){
        await db.passwordResetToken.delete({
            where: { 
                id: existingToken.id,
             }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}


export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires =  new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            }
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        }
    });

    return twoFactorToken;
}