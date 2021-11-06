import './App.css';
import Signup from './components/Signupform';
import Login from './components/LoginForm';
import Profile from './components/Profile';
import SearchAppBar from './components/SearchAppBar';
import axios from 'axios';
import { baseurl } from './core';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  useHistory,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';


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

      {/* <SearchAppBar /> */}

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React Login project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { history.push("/") }}>Dashboard</Nav.Link>
              <Nav.Link onClick={() => { history.push("/login") }}>Login</Nav.Link>
              <Nav.Link onClick={() => { history.push("/") }}>Signup</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      {(state.user === undefined) ?
        <Switch>
          <Route exact path="/">
            <h1>Loading....</h1>
          </Route>
        </Switch>
        : null}

      {(state.user === null) ?
        <Switch>
          <Route  path="/login" component={Login} />
          <Route exact path="/" component={Signup} />
        </Switch> : null
      }

      {(state.user) ?
        <Switch>
          <Route exact path="/">
            <Profile />
          </Route>
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
