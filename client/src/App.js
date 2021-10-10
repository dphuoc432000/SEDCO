import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import React from "react";

class App extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
            <>
              <Route path="/" exact>
                <Home/>
              </Route>
              <Route path="/login" render={() =>{
                return localStorage.getItem('accessToken') ?  <Redirect to="/"/>:<Login/>
              }}>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
            </>
        </Switch>
      </Router>  
    );
  }
}

export default App;
