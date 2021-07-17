import React, { useEffect, useState }  from 'react';
import Login from "./components/Login";
import Home from './components/Home';
import { BrowserRouter as Router , Route , Switch } from "react-router-dom";
import Register from './components/Register';
import Profile from './components/Profile';
import { Usercontext } from './Usercontext';


const App : React.FC =  () => {
 
  const [id,setId]=useState< any| null>("");
  

  useEffect(()=>{
    setId(localStorage.getItem("uid"))
  },[])
  
  return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Usercontext.Provider value={{id,setId}}>
            <Route exact  path="/Login">
              <Login />
            </Route>
            <Route exact  path="/Register">
              <Register />
            </Route>
            <Route exact  path="/Profile">
              <Profile />
            </Route>
            </Usercontext.Provider>
            
        
          </Switch>
        </Router>
   );
}

export default App;
