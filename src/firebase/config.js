import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  //본인의 파이어베이스 구성객체를 복사해 넣는다.
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const firedb = firebase.firestore();

export { firedb };
