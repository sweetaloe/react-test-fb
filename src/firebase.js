import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBtBpJ66aEy_RPYITJfSB5a1NJHFdjPVYY",
    authDomain: "zhv-test-project.firebaseapp.com",
    databaseURL: "https://zhv-test-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zhv-test-project",
    storageBucket: "zhv-test-project.appspot.com",
    messagingSenderId: "253347007588",
    appId: "1:253347007588:web:96148f988d563d936f6371",
    measurementId: "G-08XNVBZ7WK"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
console.log('auth', auth)
console.log('auth.app', auth.app)
