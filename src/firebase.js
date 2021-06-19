import firebase from "firebase/app";
import "firebase/storage";

import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

let storageRef = {};

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const storage = firebase.storage();

  storageRef = storage.ref();
} catch (error) {
  console.log(error);
}

export default storageRef;

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
