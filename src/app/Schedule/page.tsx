import TableData from '@/app/components/schedule/TableData';

import Styles from '@/app/styles/schedule/Schedule.module.css';

import { ScheduleInfosprops } from '@/Types/route';

import data from '@/../public/data/Data.json';
const { ScheduleInfos } = data;

export default function Schedule() {
    return(
        <div className='flex flex-col'>
            <h1 className={Styles.title}>Schedule</h1>
            <div className={Styles.schedule}>
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Sunday</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                            <th>Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ScheduleInfos.map((info: ScheduleInfosprops) => (
                            <TableData
                                key={info.id}
                                time={info.time}
                                mon={info.mon}
                                tue={info.tue}
                                wed={info.wed}
                                thu={info.thu}
                                fri={info.fri}
                                sat={info.sat}
                                sun={info.sun}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}