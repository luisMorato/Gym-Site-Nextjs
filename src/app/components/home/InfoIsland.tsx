import { FaDumbbell, FaMedal } from 'react-icons/fa';
import { BsFillMotherboardFill } from 'react-icons/bs';

import Styles from '@/app/styles/home/InfoIsland.module.css';

export default function InfoIsland() {
    return(
        <div className={Styles.Info_Island_Bckgrd}>
            <div className={Styles.info_island}>
                <div className='flex items-center gap-2'>
                    <FaDumbbell className='text-3xl text-red-600'/>
                    <p>Modern Equipments</p>
                </div>
                <div className='flex items-center gap-2'>
                    <FaMedal className='text-2xl text-red-600'/>
                    <p>Qualified Professionals</p>
                </div>
                <div className='flex items-center gap-2'>
                    <BsFillMotherboardFill className='text-2xl text-red-600'/>
                    <p>HighTech Gym</p>
                </div>
            </div>
        </div>
    )
}