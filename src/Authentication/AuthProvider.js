import React,{useContext, useEffect ,useState} from 'react';
import firebase from "./Fire";

const  AuthContext =React.createContext();
export const useAuth =(e)=>{
    return useContext(AuthContext);
}
function AuthProvider({ children }) {
    const [currentUser,setCurrentUser] =useState();
    const [present,setPresent] = useState(true);

    useEffect(()=>{
         firebase.auth().onAuthStateChanged(user => {
             setCurrentUser(user)
             setPresent(false);
         })
     },[])
     const Logout =()=>{
         return firebase.auth().signOut();
     }

     const GoogleSign =()=>{
        var provider = new firebase.auth.GoogleAuthProvider();

              return firebase.auth()
          .signInWithPopup(provider).then(result => console.log(result)).catch(error => console.log(error))
      }

    const value ={
        currentUser,
        GoogleSign,
        Logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!present && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;