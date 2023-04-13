import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/config';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { useState, useEffect, useRef } from 'react';


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const devRef = ref(db, '53,5428:-113,4974');

function TrafficDataRow({ timestamp, total, car, bus, bicycle, motorcycle, truck, train }) {
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
                const field = data[time];
                const total = field['cumulative total'];
                const car = field['car'] === undefined ? 0 : field['car'];
                const bus = field['bus'] === undefined ? 0 : field['bus'];
                const bicycle = field['bicycle'] === undefined ? 0 : field['bicycle'];
                const motorcycle = field['motorcycle'] === undefined ? 0 : field['motorcycle'];
                const truck = field['truck'] === undefined ? 0 : field['truck'];
                const train = field['train'] === undefined ? 0 : field['train'];
                
                newRows.push(
                    {'timestamp': time, 
                     'total': total,
                     'car': car,
                     'bus': bus,
                     'bicycle': bicycle,
                     'motorcycle': motorcycle,
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
                    <th>Number of Cars</th>
                    <th>Number of Buses</th>
                    <th>Number of Bicycles</th>
                    <th>Number of Motorcycles</th>
                    <th>Number of Trucks</th>
                    <th>Number of Trains</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <TrafficDataRow key={index} timestamp={row.timestamp} total={row.total} car={row.car} bus={row.bus} bicycle={row.bicycle} motorcycle={row.motorcycle} truck={row.truck} train={row.train} />
                ))}
            </tbody>
        </table>
    );
}

