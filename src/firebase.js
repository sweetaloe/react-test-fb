import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBtBpJ66aEy_RPYITJfSB5a1NJHFdjPVYY",
    authDomain: "zhv-test-project.firebaseapp.com",
    projectId: "zhv-test-project",
    storageBucket: "zhv-test-project.appspot.com",
    messagingSenderId: "253347007588",
    appId: "1:253347007588:web:96148f988d563d936f6371",
    measurementId: "G-08XNVBZ7WK"
};


const app = initializeApp(firebaseConfig);

//чел из интернетов сделал заранее прикол с авторизацией, не знаю нужен ли он вам. если сами не разберётесь можете чиркануть
// export const auth = getAuth();

export default getFirestore(app);