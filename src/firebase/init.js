import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBEtePcU5YqpEQhAL78uSA1BDBHjlyuJAw',
  authDomain: 'lifegems-e4989.firebaseapp.com',
  databaseURL: 'https://lifegems-e4989.firebaseio.com',
  projectId: 'lifegems-e4989',
  storageBucket: 'lifegems-e4989.appspot.com',
  messagingSenderId: '1074816553825'
}
const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore()
