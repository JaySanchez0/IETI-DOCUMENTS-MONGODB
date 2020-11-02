import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Planner from './components/Planner';
import Registro from './components/Login/Registro'
import Update from './components/Login/Update';
import Users from './components/Users';

function App() {
  return (
    <BrowserRouter>

        <Route path="/" 
            component={Login} exact></Route>

        <Route path="/signup" render={()=><Registro></Registro>}/>

        <Route path="/planer" 
            component={Planner} exact></Route>

        <Route path="/logout" render={()=>{
          var users = localStorage.getItem("users");
          localStorage.clear();
          localStorage.setItem("users",users);
          return <Redirect to="/"></Redirect>;
        }} exact />
        <Route path="/update" component={Update}></Route>
        <Route path="/user" component={Users}></Route>
    </BrowserRouter>
  );
}

export default App;
