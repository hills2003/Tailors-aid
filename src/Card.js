import React,{useState ,useEffect} from 'react';
import Carditem from "./Carditem";
import firebase from "./Authentication/Fire";
import {useAuth} from "./Authentication/AuthProvider"

function Card(props) {
    const {currentUser} =useAuth();
    const short1 =currentUser.email.indexOf('@');
    const short2 = currentUser.email.slice(0,short1);
    const [item,setItem] =useState([
        
        ])
     useEffect(()=>{
         firebase.database().ref().child(short2).on('value',(snapshot)=>{
             const arr =[];
             snapshot.forEach((snap) => {
                  arr.push({
                      back:snap.val().back,
                      base:snap.val().base,
                      burst:snap.val().burst,
                      contact:snap.val().contact,
                      date:snap.val().date,
                      description:snap.val().description,
                      lenght:snap.val().lenght,
                      name:snap.val().name,
                      photo:snap.val().photo,
                      roundSleeve:snap.val().roundSleeve,
                      sleeve:snap.val().sleeve,
                      thigh:snap.val().thigh,
                      waist:snap.val().waist,
                      id:snap.key
                  })
                   setItem(arr);
             })
         })
     },[])
    
    return (
        <div style={{marginTop:'10em'}}>
           {item && item.map(each => (
               <Carditem key={each.id} each={each}/>
           ))}
        </div>
    );
}

export default Card;