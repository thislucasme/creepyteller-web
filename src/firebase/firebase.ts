import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
export const config = {
	apiKey: "AIzaSyCG8zWUWSFbzOYvPsIiJ79LBam-AeAm7wo",
	authDomain: "iptv-9ca.firebaseapp.com",
	databaseURL: "https://iptv-9ca.firebaseio.com",
	projectId: "iptv-9ca",
	storageBucket: "iptv-9ca.appspot.com",
	messagingSenderId: "827082237784",
	appId: "1:827082237784:web:a0c6e554da4a1dffa3a72d",
	measurementId: "G-TTCQDQWP3Q"
};


const app = initializeApp(config);

export const db = getFirestore(app);