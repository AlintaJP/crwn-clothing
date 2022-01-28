import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARWi3PPsa0G3QKhymFJnBRD5HwVi1FQzc",
  authDomain: "crwn-db-b5022.firebaseapp.com",
  projectId: "crwn-db-b5022",
  storageBucket: "crwn-db-b5022.appspot.com",
  messagingSenderId: "504210673134",
  appId: "1:504210673134:web:d4361f9b0641da110dd2ff",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);

  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return userRef;
};

export const signUp = async (email, password, displayName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await createUserProfileDocument(user, { displayName });
};

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
