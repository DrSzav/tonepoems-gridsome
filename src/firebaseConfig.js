import firebase from 'firebase/app'
import 'firebase/firestore'
// Your Setup Firebase configuration

const apiKey = process.env.FIREBASE_API_KEY;
console.log('api key', apiKey)  
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


console.log(process.env)

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
db.settings({
  experimentalForceLongPolling: true,
  useFetchStreams: false
})

export { db }
