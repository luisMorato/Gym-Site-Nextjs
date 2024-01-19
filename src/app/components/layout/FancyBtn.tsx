import { FaArrowRight } from 'react-icons/fa';

import Styles from '@/app/styles/layout/FancyBtn.module.css';

export default function FancyBtn({ text }: {text: string}) {
    return(
        <button className={Styles.fancy_btn}>
                {text}
                <FaArrowRight className="text-red-600 ml-2"></FaArrowRight>
        </button>
    )
}