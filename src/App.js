import './App.css';
import React ,{useState} from 'react'
import {BottomNavigation ,IconButton ,BottomNavigationAction,AppBar,Toolbar , makeStyles, Paper, Avatar} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from "./Card";
import {Link ,useHistory} from "react-router-dom";
import {useAuth} from "./Authentication/AuthProvider";

const useStyles= makeStyles({
     bottom:{
          position:'fixed',
          bottom:0,
          left:'40%',
          marginTop:'2em'
     },
     flex:{
       display:'flex',
       justifyContent:'space-between'
     },
     appbar:{
      background:'#f50057',
     }
})
function App() {
  const history =useHistory();
  const {currentUser ,Logout} =useAuth();
  const classes =useStyles();
  const [state,setState]=useState(0);

  const handleChange =(e,newValue) =>{
    setState(newValue);
  }
  const Takeout =async()=>{
    try{
      await Logout()
      history.push("/login")
    }
    catch{
      console.log('failed to log out')
    }
  }
  return (
    <>
    <AppBar className={classes.appbar}>
      <Toolbar className={classes.flex}>
        <Avatar className={classes.avatar} src={currentUser.photoURL} />
        <h3>{currentUser.displayName}</h3>
        <IconButton onClick={Takeout}><ExitToAppIcon className={classes.end}/> </IconButton>
      </Toolbar>
    </AppBar>
     

     <Card />

      <Paper className={classes.bottom}>
       <BottomNavigation value={state} onChange={handleChange}> 
         <Link to="/Add"> <BottomNavigationAction icon={<AddCircleOutlineIcon color='secondary'/>} /> </Link>
       </BottomNavigation>
      </Paper>
       
    </>
  );
}

export default App;
