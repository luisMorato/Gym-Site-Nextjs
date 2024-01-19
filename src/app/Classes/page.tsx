import ClassesCards from '@/app/components/classes/classesCards';

import Styles from '@/app/styles/classes/Classes.module.css';

import data from '@/../public/data/Data.json';
const { classes } =  data;

export default function Classes() {
    return(
        <div className={Styles.classes}>
            <div className={Styles.class_container}>
                <div className={Styles.class_content}>
                    {classes.map((Eachclass) => (
                        <ClassesCards
                            key={Eachclass.id}
                            id = {Eachclass.id}
                            type={Eachclass.type}
                            src={Eachclass.src}
                            schedule={Eachclass.schedule}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}