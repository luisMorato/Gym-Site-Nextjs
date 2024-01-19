import Styles from '@/app/styles/layout/Logo.module.css';

export default function Logo({ text }: {text: string}) {
    return(
        <div className={text === 'header' ? Styles.logo : Styles.logo2x}>
            <h2><span>3CC</span>GYM</h2>
            <p>Gym Center</p>
        </div>
    )
}