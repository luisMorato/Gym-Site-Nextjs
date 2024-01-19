import { NextResponse } from "next/server";

import { reset } from "@/services/User/route";

export const POST = async (req: Request) => {
    try {
        const email = await req.json();
        const data = await reset(email);

        if(!data.error){
            return NextResponse.json({ok: data.ok, message: data.success}, {status: data.status});
        }
        return NextResponse.json({ok: data.ok, message: data.error}, {status: data.status});

    } catch (err) {
        return new NextResponse("Server Error", { status: 500 });
    }
}