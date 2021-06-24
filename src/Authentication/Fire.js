import firebase from "firebase/app"
import "firebase/auth";
import "firebase/storage";
import "firebase/database";


firebase.initializeApp({
  apiKey: "AIzaSyBRXU_CxKhYCDwdN5UlQDWBkEDa9vggM8E",
  authDomain: "lewek-b57c3.firebaseapp.com",
  databaseURL: "https://lewek-b57c3-default-rtdb.firebaseio.com",
  projectId: "lewek-b57c3",
  storageBucket: "lewek-b57c3.appspot.com",
  messagingSenderId: "661612329725",
  appId: "1:661612329725:web:692b2cdfc63af27ed2dc94"
})

//export const storage = firebase.storage();
export default firebase; 
console.log(firebase)