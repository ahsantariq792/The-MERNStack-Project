import './App.css';
import Signup from './components/Signupform';
import Login from './components/LoginForm';
import DashNavbar from './components/Navbar/DashNavbar';
import Dashboard from './components/Dashboard/Dashboard';
import Splashscreen from './components/Splashscreen';
import Profile from './components/Profile';
import SearchAppBar from './components/Navbar/SearchAppBar';
import MyPosts from './components/Dashboard/MyPosts';
import axios from 'axios';
import { baseurl } from './core';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  Route,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { GlobalContext } from './context/Context';
import { useContext } from "react";

function App() {

  let history = useHistory();
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {

    axios.get(`${baseurl}/api/v1/profile`, {
      withCredentials: true
    })
      .then((res) => {
        console.log("res: ", res.data);

        if (res.data.email) {

          dispatch({
            type: "USER_LOGIN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              _id: res.data._id
            }
          })
        } else {
          dispatch({ type: "USER_LOGOUT" })
        }
      }).catch((e) => {
        dispatch({ type: "USER_LOGOUT" })
      })

    return () => {
    };
  }, []);


  return (
    <>
      {(state?.user?.email) ?

        <DashNavbar />
        :
        <SearchAppBar />

      }




      {(state.user === undefined) ?
        <Switch>
          <Route exact path="/">
          
            
              <Splashscreen />
          
            
          </Route>
        </Switch>
        : null}

      {(state.user === null) ?
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Redirect to="/" />
        </Switch> : null
      }

      {(state.user) ?
        <Switch>
          <Route exact path="/">
            <Profile />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/myposts">
            <MyPosts />
          </Route>


          <Redirect to="/" />
        </Switch>
        : null}





      {/* <Router>
        <SearchAppBar />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Signup />
          </Route>
        </Switch>
      </Router> */}
    </>
  );
}

export default App;
