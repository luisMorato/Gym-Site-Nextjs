import { NextResponse } from "next/server"

import { newPassword } from "@/services/User/route";

export const PUT = async (req: Request) => {
    try {
        const { password, token } = await req.json();
        const data = await newPassword(password, token);

        if(!data?.error){
            return NextResponse.json({ok: data?.ok, message: data?.success}, {status: data?.status})
        }
        return NextResponse.json({ok: data?.ok, message: data?.error}, {status: data?.status})
    } catch (err) {
        return new NextResponse("Server Error", { status: 500 })
    }
}