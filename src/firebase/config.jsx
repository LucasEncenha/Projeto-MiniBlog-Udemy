import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBbYwSr84vpCfIvnb5ZqRLMJSNvK-82J9o",
  authDomain: "miniblog-1eea5.firebaseapp.com",
  projectId: "miniblog-1eea5",
  storageBucket: "miniblog-1eea5.appspot.com",
  messagingSenderId: "276884297829",
  appId: "1:276884297829:web:c8460cfcf1a7ef7448ce8c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};