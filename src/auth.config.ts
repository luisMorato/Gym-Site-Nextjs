// import Github from "next-auth/providers/github";
import  Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import type { NextAuthConfig } from "next-auth";
import { db } from "./lib/db";

export default {
    providers: [
        Credentials({
            async authorize(credentials): Promise<any>{
                const email = credentials.email as string;
                const password = credentials.password as string;
                
                const user = await db.user.findUnique({
                    where: {
                        email: email,
                    }
                });

                if(user){
                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.createPassword,
                    );

                    if(passwordMatch){
                        return user;
                    };
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig;