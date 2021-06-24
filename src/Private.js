import React from 'react';
import { Route ,Redirect } from 'react-router-dom';
import { useAuth } from "./Authentication/AuthProvider";

function Private({component:Component ,...Rest}) {
    const { currentUser } = useAuth();

    return (
        <Route
        {...Rest}
        render={props =>{
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
        >
            
        </Route>
    );
}

export default Private;