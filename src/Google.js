import React from 'react';
import GoogleSign from "./Authentication/AuthProvider";
import {useHistory } from "react-router-dom";
import {useAuth} from "./Authentication/AuthProvider"
import { Chip ,Avatar} from "@material-ui/core"
import LockIcon from '@material-ui/icons/Lock';
function Google(props) {
    const history =useHistory();
    const {GoogleSign} = useAuth()

    const SignIn =async(e)=>{
        try{
           await GoogleSign()
           history.push("/")
        }
        catch{
            console.log('error')

        }
    }
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <h3 style={{color:'pink'}}>Tailor's Aid</h3>
            <Chip avatar={<Avatar> <LockIcon /> </Avatar>} onClick={SignIn} label="Sign In" />
        </div>
    );
}

export default Google;