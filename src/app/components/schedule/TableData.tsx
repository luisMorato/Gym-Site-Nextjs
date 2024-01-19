import Styles from '@/app/styles/schedule/Schedule.module.css';

type TableDataProps  = {
    time: string,
    mon: string,
    tue: string,
    wed: string,
    thu: string,
    fri: string,
    sat: string,
    sun: string,
};

export default function TableData({ time, mon, tue, wed, thu, fri, sat, sun }: TableDataProps ) {
    return(
        <>
            <tr>
                <td><b>{time}</b></td>
                <td className={mon === 'Closed' ? Styles.itsclosed : ''}>{mon}</td>
                <td className={sun === 'Closed' ? Styles.itsclosed : ''}>{sun}</td>
                <td className={tue === 'Closed' ? Styles.itsclosed : ''}>{tue}</td>
                <td className={wed === 'Closed' ? Styles.itsclosed : ''}>{wed}</td>
                <td className={thu === 'Closed' ? Styles.itsclosed : ''}>{thu}</td>
                <td className={fri === 'Closed' ? Styles.itsclosed : ''}>{fri}</td>
                <td className={sat === 'Closed' ? Styles.itsclosed : ''}>{sat}</td>
            </tr>
        </>
    )
}