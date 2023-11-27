import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  //본인의 파이어베이스 구성객체를 복사해 넣는다.
  apiKey: "AIzaSyCCb3ayDrylSdw2aWME488UKsNHjRDaG3k",
  authDomain: "cooking-recipe-b57a1.firebaseapp.com",
  projectId: "cooking-recipe-b57a1",
  storageBucket: "cooking-recipe-b57a1.appspot.com",
  messagingSenderId: "985814654675",
  appId: "1:985814654675:web:7c632cd02fc7aa87657e26",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const firedb = firebase.firestore();

export { firedb };
