import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.FIREBAE_MESSAGING_SENDER_ID,
}

firebase.initializeApp(config)

export default firebase
