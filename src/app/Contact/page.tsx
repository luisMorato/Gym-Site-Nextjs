import ContactForm from '@/app/components/Contact/ContactForm';
import ContactSections from '@/app/components/Contact/ContactSections';
import ContactOurTeam from '@/app/components/Contact/ContactOurTeam';

import Styles from '@/app/styles/contact/Contact.module.css';

export default function Contact() {
    return (
        <div className={Styles.contact_container}>
            <div className={Styles.contact}>
                <div className='flex flex-col items-center'>
                    <h1>Contact Us</h1>
                    <h2>Get in Touch With Our Creator-Friendly Support Team</h2>
                </div>
                <ContactSections />
                <div className={Styles.contact_form}>
                    <section>
                        <h2>Send Us An Email</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos laboriosam obcaecati vero unde reiciendis expedita magnam distinctio quam, cum laudantium nemo repudiandae doloremque. Ex magni eveniet fuga, asperiores vel totam! Lorem ipsum dolor sit amet consectetur adipisicing elit.!</p>
                    </section>
                    <ContactForm />
                </div>
                <ContactOurTeam />
            </div>
        </div>
    )
}