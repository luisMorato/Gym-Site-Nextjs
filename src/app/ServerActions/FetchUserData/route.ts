'use server';
import { auth } from "@/auth";

export const fetchUserData = async () => {
    const domain = process.env.NEXT_PUBLIC_APP_URL;

    const session = await auth();

    if(session){
        const userEmail = session.user?.email;
        const url = `${domain}/api/FindUser?email=${userEmail}`;

        try{
            const response = await fetch(url,
                {
                    method: "GET",
                }
            )
            const resJson = await response.json();
            return resJson.user;
        }catch(err){
            console.log(`error: ${err}`);
            return false;
        }
    }
}