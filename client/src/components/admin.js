import React, { Component } from "react";
import "./admin.css";
import axios from "axios";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import AdminCard from "./admincard";
import VacationAdder from "./VacationAdder";
import "./admin.css";
import {message} from "antd"
import Cookies from 'js-cookie';


// the admin class is responsible for displaying the admin panel.
class Admin extends Component {


  // the state has a user object , a redirect: flase default setting, vacations array and a login redirect.
  
  state = {
    user: {},
    redirect: false,
    vacations: [],
    isAuth: false,
    redirectLogin: false
  };

// this function will log out the user by removing the jwt token from the cookie and redirect him.
  logOut = () => {
    Cookies.remove('jwt')
    this.setState({ redirect: true, isAuth: false });
  };
// this function is invoked in the 'adminCard' component to delete the vacation from the array of vacation.
  deleteCardFromState = id => {
    let { vacations } = this.state;
    this.setState({
      vacations: vacations.filter(item => item.props.vacationID !== id)
    });
    console.log(this.state.vacations);
    axios
    .post("/api/vacations/deleteTheVacation",{vacationID:id})
    .then(res => {
      message.success("Vacation Successfully Deleted", 2);
    })
    .catch(err => {
      console.log(err);
     
    });

  };
// this function will 'compile' the data received from the server to display the vacation on the screen.
// it will do the map method on the response array and wrap all the data with <AdminCard> component.
  compileData = raw_data => {
    let compiledArray = raw_data.map(vacation => {
      return (
        <AdminCard
          openModalHandler={this.openModalHandler}
          clearCard={this.deleteCardFromState}
          title={vacation.title}
          key={vacation.id}
          vacationID={vacation.id}
          image={vacation.image}
          vacationData={vacation}
        />
      );
    });

    this.setState({ vacations: compiledArray });
  };
// this function will fetch vacations data fom the server 
  getVacations = userID_ => {
    let rawData = [];
    axios
      .post("/api/vacations/getAllVacations", { userID: userID_ })
      .then(res => {
        console.log(res.data);
        rawData = res.data;
        this.compileData(rawData);
        // this.setState({user:res.data})
      })
      .catch(err => {
        console.log(err);
        // _self.setState({ errors: err.response.data })
      });
  };
  // this function will clear out of the vacations from the DOM. ---- UNUSED
  clearVacState = () => {
    this.setState({ vacations: [] });
  };

  // this function will send auth request prior getting the vacation array. a.k.a 'getVacations' function. if success -> call 'getVacations'
  checkBeforeGettingVacations = () => {
    let _userID_ = null;
    var _this__ = this;
    axios
      .get("/api/users/current")
      .then(res => {
        console.log(res.data);
        // if (res.user.role !==1 ) _this__.setState({redirect:true});
        _userID_ = res.data.id;
        if (res.data.role === 0)
          _this__.setState({ redirectHome: true, redirect: false });
        _this__.getVacations(_userID_);
        _this__.setState({ user: res.data, redirect: false });
        _this__.props.isAdminAuthed();
      })
      .catch(err => {
        console.log(err);
        _this__.setState({ redirect: true });
      });
  };

  
  componentDidMount() {
    this.checkBeforeGettingVacations();
  }

  render() {
    const { user, redirect, redirectHome } = this.state;
    if (redirect) return <Redirect to="/login" />;
    if (redirectHome) return <Redirect to="/home" />;

    return (
      <div>
        <nav className="navbar navbar-light bg-light navbar-expand-lg  mr-auto gradient" >
          <Link className="navbar-brand" style={{fontFamily: 'Baloo, cursive'}} to="/home" onClick={this.getVacations}>
            VacationBuzz
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          

          <div className="collapse navbar-collapse main-menu-item justify-content-end "
                            id="navbarSupportedContent">
            
          <ul className=" navbar-nav align-items-center">
          <p className="navbar-brand mt-3" style={{fontFamily: 'Baloo, cursive'}}>Hello {user.name}</p>    
          <li>
            <Link
            style={{fontFamily: 'Baloo, cursive'}}
              className="btn btn-outline-success my-2 my-sm-0"
              // onClick={this.clearVacState}
              to="/addNewVacation"
            >
              Add New Vacation
            </Link>
            </li>
            <li>
            <Link
              className="btn btn-outline-info my-2 my-sm-0 ml-1"
              // onClick={this.clearVacState}
              style={{fontFamily: 'Baloo, cursive'}}
              to="/analysis"
            >
              Analysis
            </Link>
            </li>
            <li>
            <button
              className="btn btn-outline-warning my-2 my-sm-0 ml-1"
              onClick={this.logOut}
              style={{fontFamily: 'Baloo, cursive'}}
            >
              Log Out
            </button>
            </li>
          </ul>
          </div>
        </nav>
        <div className="results justify-content-center mt-3">
          {this.state.vacations}
        </div>
      </div>
    );
  }
}

export default Admin;
