import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Add from "./Add";
import {BrowserRouter as Router ,Route ,Switch} from "react-router-dom";
import AuthProvider from "./Authentication/AuthProvider";
import Google from "./Google";
import Private from './Private'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
    <Router>
      <Switch>
        <Private exact path="/" component={App} />
        <Private path="/Add" component={Add} />
        <Route path="/login" component={Google} />
      </Switch>
    </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

