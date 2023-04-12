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
            <td className='car'>{ car } </td>
            <td className='bus'>{ bus } </td>
            <td className='bicycle'>{ bicycle }</td>
            <td className='motorcycle'>{ motorcycle }</td>
            <td className='truck'>{ truck }</td>
            <td className='train'>{ train }</td>
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
                field = data[time];
                total = field['cumulative total'];
                car = field['car'] === undefined ? 0 : field['car'];
                bus = field['bus'] === undefined ? 0 : field['bus'];
                bicycle = field['bicycle'] === undefined ? 0 : field['bicycle'];
                motorcycle = field['motorcycle'] === undefined ? 0 : field['motorcycle'];
                truck = field['truck'] === undefined ? 0 : field['truck'];
                train = field['train'] === undefined ? 0 : field['train'];
                
                newRows.push(
                    {'timestamp': time, 
                     'total': total,
                     'car': car,
                     'bus': bus,
                     'bicycle': bicycle,
                     'motorcycle': motocycle,
                     'truck': truck,
                     'train': train
                    });
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

