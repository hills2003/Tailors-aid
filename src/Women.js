
import React from 'react';
import {makeStyles} from "@material-ui/core";

const useStyles=makeStyles({
    space:{
        marginTop:'3em',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})

function Women(props) {
    const classes = useStyles()
    return (
        <div className={classes.space}>
            <p>There is no Info for now</p>
        </div>
    );
}

export default Women;