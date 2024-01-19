import NextAuth from "next-auth";
import authConfig from '@/auth.config';
import { NextResponse } from "next/server";

import { 
    publicRoutes, 
    authRoutes, 
    apiAuthPrefix, 
    DEFAULT_LOGIN_REDIRECT 
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
    
    if(isApiAuthRoute){
        return null;
    }

    if(isAuthRoutes){
        if(isLoggedIn && nextUrl.pathname !== '/Register'){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if(!isLoggedIn && !isPublicRoute && !nextUrl.pathname.includes("/Classes")){
        return NextResponse.redirect(new URL('/Login', nextUrl));
    }

    return null;
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}