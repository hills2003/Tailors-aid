import { AppBar, IconButton, Tab, Tabs } from '@material-ui/core';
import React,{useState} from 'react';
import {makeStyles} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from "react-router-dom";
import Men from "./Men";
import Women from "./Women"

const useStyles =makeStyles({
    center:{
        background:'#f50057',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})
function Add(props) {
     
    const [value,setValue] =useState(0);

    const handleChange=(e,newValue)=>{
        setValue(newValue);
    }
    const classes =useStyles()
    return (
        <div>
            <AppBar className={classes.center}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Men" />
                    <Tab label="Women" />
                </Tabs>
                <Link to="/"> <IconButton><ArrowBackIosIcon /> </IconButton> </Link>
            </AppBar>

            {value == 0 ? <Men /> : <Women />}
        </div>
    );
}

export default Add;