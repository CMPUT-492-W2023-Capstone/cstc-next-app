import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/config';
import { getDatabase, ref, onValue } from 'firebase/database';


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log('Connected to DB');
