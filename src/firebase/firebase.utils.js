import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyARWi3PPsa0G3QKhymFJnBRD5HwVi1FQzc",
  authDomain: "crwn-db-b5022.firebaseapp.com",
  projectId: "crwn-db-b5022",
  storageBucket: "crwn-db-b5022.appspot.com",
  messagingSenderId: "504210673134",
  appId: "1:504210673134:web:d4361f9b0641da110dd2ff",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
