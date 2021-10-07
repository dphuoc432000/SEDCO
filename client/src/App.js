import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Header from './components/Header/Header';
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Main from './components/Main/Main'
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
          <>
            <Header/>
            <Route path="/" exact>
              <Home/>
            </Route>
            <main>
              
                  <Route path="/login">
                  <Login/>
                </Route>
                <Route path="/register">
                <Register/>
              </Route>
            </main>
          </>
      </Switch>
    </Router>  
  );
}

export default App;
