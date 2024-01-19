import { auth } from '@/auth';
import { getUsersByEmail } from '@/services/User/route';

import Image from 'next/image';
import Link from 'next/link';

import data from '@/../public/data/Data.json';
const { classes } = data;

const UserRegisteredClasses = async () => {
    const session = await auth();
    const data = await getUsersByEmail(session?.user?.email as string).then((data) => {
        return data;
    });

    const searchUser = data;

    classes.map((eachClass) => {
        searchUser?.userClassesID.filter((index) => index === eachClass.id);
    });
    
    return (
        <div className='pr-5 max-[768px]:w-full  max-[992px]:w-full'>
            <h1 className='text-xl font-bold relative after:absolute after:h-[3px] after:w-[80px] after:top-full after:left-0 after:bg-red-600'>My Classes</h1>
            {searchUser?.userClassesID.length !== 0 ?
                <div className='w-fit columns-3 mt-5  max-[768px]:flex max-[768px]:flex-col max-[768px]:mx-auto'>
                    { 
                        classes.map((eachClass) => (
                            searchUser?.userClassesID.filter((id) => id === eachClass.id).map(() => (
                                <Link key={eachClass.id} href={`/Classes/${eachClass.id}`}>
                                    <div className='border border-black rounded-[16px] w-[250px] h-[350px] overflow-hidden relative mb-3'>
                                        <Image src={eachClass.src} alt={`class-${eachClass.type}`} fill={true} quality={100} sizes="250px" priority/>
                                        <h2 className='font-semibold text-xl text-center text-white left-3 top-3/4 z-10 absolute'>{eachClass.type}</h2>
                                        <span className='bg-red-600 h-[3px] w-[50px] absolute left-3 bottom-14'></span>
                                        <p className='text-sm text-center text-white absolute left-3 bottom-8 z-10'>{eachClass.schedule}</p>
                                    </div>
                                </Link>
                            ))
                        ))
                    }
                </div>
                :
                <div className='w-max flex flex-col items-center justify-center mt-4  max-[600px]:w-fit max-[600px]:text-center  max-[992px]:w-full'>
                    <h2 className='font-semibold mb-2'>User Doesn&apos;t have Subscribed to any classes yet.</h2>
                    <p className='font-semibold mb-4'>Subscribe To Your Fisrt Class</p>
                    <Link href={searchUser?.UserPlanID ? '/Classes' : '/#priceplans'}><button className='border border-black pl-4 pr-4 pt-1 pb-1 text-white font-semibold bg-black hover:text-black hover:bg-transparent transition duration-300'>Subscribe</button></Link>
                </div>
            }
        </div>
    )
}

export default UserRegisteredClasses;