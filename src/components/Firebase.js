import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAocnTVfQ0E_ueLqhnZwwZ5jt-nhCa0g64",
	authDomain: "db-deteksi.firebaseapp.com",
	databaseURL:
		"https://db-deteksi-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "db-deteksi",
	storageBucket: "db-deteksi.appspot.com",
	messagingSenderId: "164350645102",
	appId: "1:164350645102:web:32446134bc20f868c3677f",
	measurementId: "G-W0WH88VM3R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const dbFirestore = getFirestore(app);
export const db = getDatabase(app);
export default app;
