import Styles from '@/app/styles/contact/ContactOurTeam.module.css';
import ContactTeamCard from './ContactTeamCard';

import data from '@/../public/data/Data.json';
const { ContactTeamInfo } = data;

export default function ContactOurTeam() {
    return (
        <div>
            <div className={Styles.contact_team_title}>
                <h2>Talk To Real People</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint porro fuga officia exercitationem! A veniam iste sapiente ex, perferendis exercitationem eius inventore, eveniet repellendus quisquam minima ullam odio reiciendis aut.</p>
            </div>
            <div className={Styles.ContactTeam}>
                {ContactTeamInfo.map((info) => (
                    <ContactTeamCard 
                    key={info.id} 
                    imgSrc={info.imgSrc}
                    location={info.location}
                    name={info.name}
                    desc={info.desc}
                    />
                ))}
            </div>
        </div>
    )
}