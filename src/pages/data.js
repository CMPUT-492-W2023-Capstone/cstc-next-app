import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/config';
import { getDatabase, ref, onValue } from 'firebase/database';


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const devRef = ref(db, 'dev/');

onValue(devRef, (snapshot) => {
    console.log(snapshot.val());
});

export default function TrafficDataTable() {
    return (
        <>
            <p>Data Page</p>
        </>
    );
}

