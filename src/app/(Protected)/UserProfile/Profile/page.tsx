import { auth, signOut } from "@/auth";
import { getUsersByEmail } from "@/services/User/route";

import data from '@/../public/data/Data.json';
const { plans } = data; 

import Cards from "@/app/components/UserProfile/Profile/Cards";
import KnowMore from "@/app/components/UserProfile/Profile/KnowMore";
import MyPlan from "@/app/components/UserProfile/Profile/MyPlan";

import Styles from '@/app/styles/UserProfile/Profile/Profile.module.css';

export default async function Profile(){
    const session = await auth();
    const data = await getUsersByEmail(session?.user?.email as string).then((data) => {
        return data;
    });

    const searchUser = data;
    const searchUserPlan = plans.find(({ id }) => id === searchUser?.UserPlanID);

    return (
        <div className={Styles.profile}>
            <div>
                <h1 className="after:bg-red-600 after:h-[3px] after:left-0 after:absolute after:top-full after:w-20">Profile</h1>
                <br />
                <h2>Hello, <b>{searchUser?.firstName}</b></h2>
                <h2>Plan: <b>{searchUserPlan ? searchUserPlan.level : "No Plan Selected"}</b></h2>
                <Cards 
                    searchUserPlan={searchUserPlan!}
                />
                <MyPlan 
                    searchUserPlan={searchUserPlan!}
                />
                <KnowMore />
            </div>
            <div className={Styles.logOutBtn}>
                <form action={async () => {
                    'use server'
                    await signOut()
                }}>
                    <button type="submit">LogOut</button>
                </form>
            </div>
        </div>
    )
}