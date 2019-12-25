import firebase from 'firebase'
import 'firebase/storage'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzgjtvTRckZojic2wFEOwV2sMOTIgIT7o", //process.env.FIREBASE_API,
    authDomain: "sei-project4.firebaseapp.com",
    databaseURL: "https://sei-project4.firebaseio.com",
    projectId: "sei-project4",
    storageBucket: "sei-project4.appspot.com",
    messagingSenderId: "197890365238", //process.env.FIREBASE_MESSAGE_ID
    appId: "1:197890365238:web:96150e118fd4ffcdedc597",
    measurementId: "G-YK90CCT0SC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export {
    storage, firebase as default
}