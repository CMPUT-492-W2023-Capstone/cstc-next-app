import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/config';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useRef } from 'react';


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const devRef = ref(db, '53,5210:-113,5324');

function TrafficDataRow({ timestamp, total }) {
    return (
        <tr>
            <td className='timestamp'>{ timestamp }</td>
            <td className='total'>{ total } </td>
        </tr>
    );
}

export default function TrafficDataTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {

        onValue(devRef, (snapshot) => {
            const data = snapshot.val();
            const newRows = [];
            for (const time in data) {
                newRows.push({'timestamp': time, 'total': data[time]['cumulative total']});
            }

            setRows(newRows);
        });

    }, []);

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Number of Vehicles</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <TrafficDataRow key={index} timestamp={row.timestamp} total={row.total} />
                ))}
            </tbody>
        </table>
    );
}

