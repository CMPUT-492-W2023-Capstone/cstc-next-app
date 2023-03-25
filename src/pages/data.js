import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';


const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

