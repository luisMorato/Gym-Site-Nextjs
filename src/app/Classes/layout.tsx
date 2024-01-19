import Image  from 'next/image';

import Styles from '@/app/styles/classes/Classes.module.css';

export default function classesLayout({ children }: {children: React.ReactNode}) {
    return (
        <div>
            <div className={Styles.classes_layout}>
                <Image className="brightness-75" src="/imgs/gym-handsome-man-during-workout.png" alt="man training" width={500} height={500} priority={true}></Image>
                <h1 className="font-bold relative">Classes</h1>
                <Image className="brightness-50" src="/imgs/muscle-man-gym.png" alt="man training" width={500} height={500} priority={true}></Image>
            </div>
            {children}
        </div>
    )
}