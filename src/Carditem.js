import React,{useState} from 'react';
import {Card ,ListSubheader ,ListItemText, makeStyles ,CardHeader ,List ,ListItem ,Collapse ,CardContent ,CardActions , Avatar, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import firebase from "./Authentication/Fire";
import {useAuth} from "./Authentication/AuthProvider";
import { Link } from "react-router-dom"
const useStyles =makeStyles({
    card:{
        marginBottom:'2em'
    },
    end:{
        display:'flex',
        justifyContent:'flex-end'
    },
    on:{
       
        display:'block',
        
    },
    off:{
        display:'none'
    }
})
export var real;
function Carditem({each}) {
    const classes =useStyles()
    const[open,setOpen] =useState(false);
    const {currentUser} = useAuth();
    const [toggle,setToggle] = useState(true);
    const [view,setView] =useState();
    const short1 =currentUser.email.indexOf('@');
    const short2 = currentUser.email.slice(0,short1);

     const displayPhoto=(pics)=>{
         const result = firebase.database().ref().child(short2).child(pics).on('value',snapshot => {
            setView(snapshot.val().photo);
            real = snapshot.val().photo;
         })
         console.log(real);
         setToggle(true)
         
     }
     const performant =()=>{
         setToggle(false);
     }
     const Deleteme=(itemtodelete)=>{
        firebase.database().ref().child(short2).child(itemtodelete).remove()
     }
    return (
        <>
        <div  className={ toggle ? classes.on :classes.off}>
          <img onClick={performant} src={view}  style={{width:'50%',height:'50%',borderRadius:'50%'}} />
         </div>
          <Card className={classes.card}>
              <CardHeader avatar={<Avatar onClick={(e)=>displayPhoto(each.id)} src={each.photo} />} action={<IconButton onClick={()=>Deleteme(each.id)}>{<DeleteIcon />}</IconButton>}  title={each.name} subheader={each.date}/>
               <CardContent>
                  <p> {each.description} </p>
                   <p>{each.contact} </p>
               </CardContent>
               <CardActions className={classes.end}>
                   <IconButton onClick={(e)=>setOpen(!open)}>{ open ? <ExpandLessIcon /> :<ExpandMoreIcon />}</IconButton>
               </CardActions>
                <Collapse in={open}>
                   <List subheader={<ListSubheader>Measurements</ListSubheader>}>
                       <ListItem button>
                           <ListItemText button primary='Back' secondary={each.back + " " + "inches"}/>
                       </ListItem>

                       <ListItem button>
                       <ListItemText button primary='sleeve' secondary={each.sleeve + " " + "inches"}/>
                       </ListItem>
                       <ListItem button>
                       <ListItemText button primary='Round-Sleeve' secondary={each.roundSleeve + " " + "inches"}/>
                       </ListItem>
                       <ListItem button>
                       <ListItemText button primary='burst' secondary={each.burst + " " + "inches"}/>
                       </ListItem>

                       <ListItem button>
                       <ListItemText button primary='lenght' secondary={each.lenght + " " + "inches"}/>
                       </ListItem>

                       <ListItem button>
                       <ListItemText button primary='Thigh' secondary={each.thigh + " " + "inches"}/>
                       </ListItem>

                       <ListItem button>
                       <ListItemText button primary='Base' secondary={each.base + " " + "inches"}/>
                       </ListItem>

                       <ListItem button>
                       <ListItemText button primary='Waist' secondary={each.waist + " " + "inches"}/>
                       </ListItem>
                   </List>
                
                </Collapse>
          </Card>  
        </>
    );
}

export default Carditem;
console.log(new Date().toLocaleDateString())