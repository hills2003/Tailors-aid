import React, { useState } from 'react';
import {makeStyles ,Button ,TextField} from "@material-ui/core";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import firebase from "./Authentication/Fire";
import {useAuth} from "./Authentication/AuthProvider"

const useStyles=makeStyles({
    space:{
        marginTop:'3em'
    },
    horizontal:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    field:{
        marginTop:'2em'
    },
    button:{
        marginTop:'2em'
    }


})
function Men(props) {
    const {currentUser} = useAuth()
    const classes = useStyles();
    const [state,setState] =useState({
        name:'',
        date:'',
        contact:'',
        description:'',
        back:'',
        sleeve:'',
        burst:'',
        lenght:'',
        thigh:'',
        base:'',
        waist:'',
        roundSleeve:''
    })
    const [link,setLink] =useState('');

    const short1 =currentUser.email.indexOf('@');
    const short2 = currentUser.email.slice(0,short1);

    const[photo,setPhoto] =useState('');
    const Changer =(e)=>{
        setState({
            ...state,
             [e.target.name]:e.target.value,
            
        })
        
    }
    const photoChanger=async(e)=>{
        await setPhoto(e.target.files[0])
        if(photo){
            const first = firebase.storage().ref().child(short2).child(photo.name)
            const img =first.put(photo)
            img.on('state_changed',(snapshot)=>{
                let it = (snapshot.bytesTransferred/snapshot.totalBytes) * 100 ;
                setRead(it)
                
            },(err)=>{console.log(err)},(complete)=>{
                firebase.storage().ref().child(short2).child(photo.name).getDownloadURL().then(async(url) =>{
                     await setLink(url);
                    
                })
                alert('Upload success')
            })

        }
        
    }
    
    const pushToDatabase =(e)=>{
        e.preventDefault();
        // if(state.name && state.back && state.thigh){
            firebase.database().ref().child(short2).push({
                name:state.name,
                date:state.date,
                contact:state.contact,
                description:state.description,
                photo:link,
                back:state.back,
                sleeve:state.sleeve,
                roundSleeve:state.roundSleeve,
                burst:state.burst,
                lenght:state.lenght,
                thigh:state.thigh,
                base:state.base,
                waist:state.waist
            })

            alert('Customer has been added to your record')
        
        // else{
        //     alert('fill up Those fields')
        // }
             
             
    }
    const [read,setRead] = useState(0)
    return (
        <form onSubmit={pushToDatabase} className={classes.space}>

            <fieldset >
                <legend style={{marginTop:'1em',fontWeight:'bold',fontSize:'20px'}}>
                    Customer Details
                </legend>
                <div className={classes.horizontal}>
                   <label for="Name">Name:</label> 
                   <TextField required value={state.name} name="name" onChange={Changer} placeholder="Name" color="secondary"/>  <br />
                </div>
                 <div className={classes.horizontal}>
                   <label for="Date">Date:</label>
                   <TextField required value={state.date} name="date" onChange={Changer} color="secondary" type="date" placeholder="measurement date" /> <br />
                </div>
                <div className={classes.horizontal}>
                   <label for="Name">Contact:</label>
                   <TextField required value={state.contact} name="contact" onChange={Changer} type="number" placeholder="Contact" color="secondary" /> <br />
                </div>

                <div className={classes.horizontal}>
                   <label for="description">Description:</label> 
                   <TextField required value={state.description} name="description" onChange={Changer} placeholder="what are you going to be sewing" color="secondary"/>  <br />
                </div>

                <label for='upload'>
                   <CameraAltIcon color="secondary" />
                </label>
                <input onChange={photoChanger} name="photo" style={{display:'none'}} accept="image/*" type="file" id="upload" /> <br />
                 <progress min='0' max='100' value={read} style={{width:'100%'}}/>
            </fieldset>
            <fieldset className={classes.field}>
                <legend style={{fontWeight:'bold',fontSize:'20px'}}>Top</legend>
                <div className={classes.horizontal}>
                   <label for="back">Back:</label>
                   <TextField value={state.back} name="back" onChange={Changer} type="number" color="secondary" placeholder="Back measurement" /> <br />
                </div>
                <div className={classes.horizontal}>
                   <label for="sleeve">Sleeve:</label>
                   <TextField type="number" value={state.sleeve} name="sleeve" onChange={Changer} color="secondary" placeholder="sleeve measurement" /> <br />
                </div>
                <div className={classes.horizontal}>
                   <label for="Rs">Round sleeve:</label>
                   <TextField type="number" value={state.roundSleeve} name="roundSleeve" onChange={Changer} color="secondary" placeholder="sleeve measurement" /> <br />
                </div>
                <div className={classes.horizontal}>
                    <label for="burst">Burst:</label>
                   <TextField value={state.burst} name="burst" onChange={Changer} type="number" color="secondary" placeholder="Burst measurement" /> <br />
                </div>
                <div className={classes.horizontal}>
                   <label for="lenght">Lenght:</label>
                   <TextField value={state.lenght} name="lenght" onChange={Changer} type="number" color="secondary" placeholder="lenght measurement" /> <br />
                </div>

            </fieldset>
            <fieldset className={classes.field}>   
                <legend style={{fontWeight:'bold',fontSize:'20px'}}>Bottom</legend>
                <div className={classes.horizontal}>
                   <label for="thigh">Thigh:</label>
                   <TextField value={state.thigh} name="thigh" onChange={Changer} type="number" color="secondary" placeholder="Thigh measurement" /> <br />
                </div>
                <div className={classes.horizontal}>
                   <label for="Base">Base:</label>
                   <TextField type="number" value={state.base} name="base" onChange={Changer} color="secondary" placeholder="Base measurement" /> <br />
                </div>
                <div className={classes.horizontal}>
                    <label for="Waist">Waist:</label>
                   <TextField value={state.waist} name="waist" onChange={Changer} type="number" color="secondary" placeholder="Waist measurement" /> <br />
                </div>
                
            </fieldset>

            <Button variant="contained" className={classes.button} color="secondary" type="submit">Add</Button>
        </form>
    );
}

export default Men;