'use server';
import { Resend } from 'resend';

const domain = process.env.NEXT_PUBLIC_APP_URL;

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/NewPassword?token=${token}`;
    
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset password Token',
        html: `<p>Click <a href=${resetLink}>Here</a> to Reset Your Password.</p>`,
    });
}


export const sendTwoFactorEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '2FA Code',
        html: `<p> Your 2FA Code: ${token}</p>`,
    });
}


export const sendEmailToUs = async (data: {
    firstName: string,
    lastName: string,
    email: string,
    message: string
}) => {
    const { firstName, lastName , email, message } = data;

    const mail = await resend.emails.send({
        from: email,
        to: 'luisfernandomorato_170701@outlook.com',
        subject: `${firstName} ${lastName} - Contact`,
        html: `
            <h1>Hello, 3CCGYM:</h1>
            <p>${message}</p>
            <h2>Sincerely, ${firstName}.</h2>
        `,
    });

    if(mail) return {success: 'Email Sent!', ok: true, status: 200};
    return {error: 'Something went wrong!', ok: false, status: 400};
}