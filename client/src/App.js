import React, { Component } from "react";
import {BrowserRouter, Route, Redirect , Switch} from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import Admin from "./components/admin";
import axios from "axios";
import VacationAdder from "./components/VacationAdder";
import Check from './components/check';
import Analysis from './components/Analysis'
import VacationEdit from './components/vacationEdit'
import "./App.css"

class App extends Component {
// the state here is responsible to unlock some protected routes
state = {isAuth : false}

// connected as props to CheckFunction to unveil protected routes of the admin.
isAuthChecker = (auth) => {
  console.log(auth);
  if(auth){ this.setState({isAuth:true})}
  else {this.setState({isAuth:false})}
}

// this function will check auth and redirect
checkAuth () {
  // let jwt = Cookies.get('jwt');
  // console.log(jwt);
  let _this_ = this;
  axios
  .get("/api/users/current")
  .then(res => {
    console.log(res.data);
      if (res.data.role ===1) _this_.setState({isAuth:true});
  })
  .catch(err => {
    console.log(err);
    _this_.setState({ redirectLogin: true, redirectAdmin: false, redirectHome: false });
  });
}

componentDidMount() {
  this.checkAuth();
}

// if the admin component was invoked via routes. like typing /admin in the address bar this function will be invoked to update the state
authFromAdmin = () => {
  this.setState({isAuth:true});
}

  render() {
      return(
        <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render={(props) => <Check {...props} isAuthed={this.isAuthChecker} />}/>
            { this.state.isAuth ? 
            <Route exact path="/addNewVacation" component={VacationAdder} /> :null }
            { this.state.isAuth ? 
            <Route exact path="/edit-vacation/:id" component={VacationEdit} /> :null }
            { this.state.isAuth ? <Route exact path="/analysis" component={Analysis} />: null} 
            <Route path="/admin" render={(props) => <Admin {...props} isAdminAuthed={this.authFromAdmin}/>}/>
            <Route path="/home" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        
        </BrowserRouter>

    );

  }
}

export default App;
