import React, { Component } from "react";
import axios from "axios";
import { Redirect, Route } from "react-router";
import { Link } from "react-router-dom";
import { notification } from "antd";
import Cookies from 'js-cookie';
import Card from "./card";
import "./home.css";
import VacationAdder from "./VacationAdder";
import { PageHeader } from "antd";
import socketIOClient from "socket.io-client";
import {checkArray, arrMove} from '../functions/homefunc'

// this component is all about displaying the vacation to the registered user.

class Home extends Component {
  state = {
    user: {},
    redirect: false,
    endpoint:"localhost:5700",
    vacations: [],
    followedVacations: [],
    isAuth: false,
    redirectAdmin: false,
    loading: false
  };
// log out function to remove the cookie and redirect to the login screen.
  logOut = () => {
    Cookies.remove('jwt');
    this.setState({ redirect: true, isAuth: false });
  };

  // this function does 2 things:
  // 1. it will take a selected vacation (the clicked one), delete it from the array of vacations and push it to the following vacations.
  // 2. send server request to delete the vacation from the array and insert to the following array
  moveVacationToFollowing = vacObject => {
    console.log(vacObject)
    let { vacations } = this.state;
    let newFollowedVacations = [...this.state.followedVacations];
    // let newVacations = [...this.state.vacations];
    newFollowedVacations.push(
      <Card
        title={vacObject.title}
        key={vacObject.id}
        id={vacObject.id}
        following={vacObject.following}
        image={vacObject.image}
        start_date={vacObject.start_date}
        edit_date={vacObject.edit_date}
        end_date={vacObject.end_date}
        userid={this.state.user.id}
        priceils={vacObject.priceIls}
        priceusd={vacObject.priceUsd}
        moveVacationToFollowing={this.moveVacationToFollowing}
        moveVacationToNotFollowing={this.moveVacationToNotFollowing}
      />
    );
    this.setState({
      vacations: vacations.filter(item => item.props.id !== vacObject.id),
      followedVacations: newFollowedVacations
    });
  };

    // this function does 2 things:
  // 1. it will take a selected vacation (the clicked one), delete it from the array of followed vacations and push it to the  vacations array.
  // 2. send server request to delete the vacation from the followed vacations array and insert to the not-followed vacations array.
  moveVacationToNotFollowing = vacObject => {
    let { followedVacations } = this.state;
    let newVacations = [...this.state.vacations];
    
    // let newVacations = [...this.state.vacations];
    newVacations.push(
      <Card
        title={vacObject.title}
        key={vacObject.id}
        id={vacObject.id}
        following={vacObject.following}
        image={vacObject.image}
        start_date={vacObject.start_date}
        edit_date={vacObject.edit_date}
        end_date={vacObject.end_date}
        userid={this.state.user.id}
        priceils={vacObject.priceIls}
        priceusd={vacObject.priceUsd}
        moveVacationToFollowing={this.moveVacationToFollowing}
        moveVacationToNotFollowing={this.moveVacationToNotFollowing}
      />
    );
    this.setState({
      followedVacations: followedVacations.filter(
        item => item.props.id !== vacObject.id
      ),
      vacations: newVacations
    });
  };

 // this function will 'compile' the data received from the server to display the vacation on the screen.
// it will do the map method on the response array and wrap all the data with <Card> component.
  compileData = raw_data => {
    let compiledFollowingArray = [];
    let compiledNonFollowingArray = [];
    raw_data.forEach(vacation => {
      if (vacation.followingStatus) {
        compiledFollowingArray.push(
          <Card
            title={vacation.title}
            key={vacation.id}
            id={vacation.id}
            following={vacation.followingStatus}
            image={vacation.image}
            start_date={vacation.start_date}
            edit_date={vacation.edit_date}
            end_date={vacation.end_date}
            userid={this.state.user.id}
            priceils={vacation.price_nis}
            priceusd={vacation.price_usd}
            moveVacationToFollowing={this.moveVacationToFollowing}
            moveVacationToNotFollowing={this.moveVacationToNotFollowing}
          />
        );
      }
      if (!vacation.followingStatus) {
        compiledNonFollowingArray.push(
          <Card
            title={vacation.title}
            key={vacation.id}
            id={vacation.id}
            following={vacation.followingStatus}
            image={vacation.image}
            start_date={vacation.start_date}
            edit_date={vacation.edit_date}
            end_date={vacation.end_date}
            userid={this.state.user.id}
            priceils={vacation.price_nis}
            priceusd={vacation.price_usd}
            moveVacationToFollowing={this.moveVacationToFollowing}
            moveVacationToNotFollowing={this.moveVacationToNotFollowing}
          />
        );
      }
    });

    this.setState({
      loading: false,
      followedVacations: compiledFollowingArray,
      vacations: compiledNonFollowingArray
    });
  };
// this function will fetch vacations data fom the server 
  getVacations = userID_ => {
    console.log("secondUSERID is", userID_);
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

  clearVacState = () => {
    this.setState({ vacations: [] });
  };

  checkBeforeGettingVacations = async () => {
    let _userID = null;
    var _self_ = this;
    axios
      .get("/api/users/current")
      .then(res => {
        console.log(res.data);
        _userID = res.data.id;
        console.log("userID is", _userID);
        _self_.setState({ user: res.data, redirect: false });
        this.getVacations(_userID);
        if (this.state.user.role === 1) this.setState({ redirectAdmin: true });
      })
      .catch(err => {
        console.log(err);
        _self_.setState({ redirect: true });
      });
  };
  // this function will send auth request prior getting the vacation array. a.k.a 'getVacations' function. if success -> call 'getVacations'

  componentDidMount() {
    const { isAuth } = this.state;
    console.log(isAuth);
    this.setState({ loading: true });
    this.checkBeforeGettingVacations();
    const socket = socketIOClient(this.state.endpoint);

  // the socket function will take over, it will wait for a socket event from the server-side and update if there is.
    socket.on('VACATION_EDITED', (resp) => {
      console.log(resp)
      let {followedVacations, vacations} = this.state;
      let arrayToChange = checkArray(followedVacations,vacations,resp.id);
      console.log(arrayToChange);
      let socketEditedVacations = arrayToChange.arr.map(vac => {
        console.log(vac.props)
      if (vac.props.id == resp.id){return (  
        <Card 
              title={resp.title}
              key={resp.id}
              id={resp.id}
              following={vac.props.following}
              image={resp.image}
              start_date={resp.startDate}
              edit_date={vac.edit_date}
              end_date={resp.endDate}
              userid={this.state.user.id}
              priceils={resp.ilsPrice}
              priceusd={resp.usdPrice}
              moveVacationToFollowing={this.moveVacationToFollowing}
              moveVacationToNotFollowing={this.moveVacationToNotFollowing}
        />
        )} else { return(
          <Card 
              title={vac.props.title}
              key={vac.props.id}
              id={vac.props.id}
              following={vac.props.following}
              image={vac.props.image}
              start_date={vac.props.start_date}
              edit_date={vac.props.edit_date}
              end_date={vac.props.end_date}
              userid={this.state.user.id}
              priceils={vac.props.priceils}
              priceusd={vac.props.priceusd}
              moveVacationToFollowing={this.moveVacationToFollowing}
              moveVacationToNotFollowing={this.moveVacationToNotFollowing}
        />
        )
        } 
      })
      const foundID = socketEditedVacations.findIndex(item=> item.props.id==resp.id)
      console.log(foundID);
      arrMove(socketEditedVacations,foundID,0)
      
      if (arrayToChange.name === 'firstArray') {
      this.setState({followedVacations:socketEditedVacations})
      notification.open({message: `${socketEditedVacations[0].props.title} is updated`})
      } else { 
        this.setState({vacations:socketEditedVacations})
      }
  })
    
  }



  render() {
    const { user, redirect, isAuth, redirectAdmin } = this.state;
    // console.log(this.state.user);
    // console.log(user);
    console.log(isAuth);
    if (redirect) return <Redirect to="/login" />;
    if (redirectAdmin) return <Redirect to="/admin" />;
    // if (user.role ===1) return (<Redirect to="/admin"/>);
    // if (user.role !==0) return (<Redirect to="/login"/>);

    return (
      <div>
        <nav className="navbar navbar-light bg-light justify-content-between gradient">
          <Link className="navbar-brand" to="/home" onClick={this.getVacations} style={{fontFamily: 'Baloo, cursive'}}> 
            VacationBuzz
          </Link>
          <p className="navbar-brand mt-3" style={{fontFamily: 'Baloo, cursive'}}>Hello {user.name}</p>
          <form className="form-inline">
            {user.role === 1 ? (
              <Link
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={this.clearVacState}
                to="/addNewVacation"
              >
                Add New Vacation
              </Link>
            ) : null}
            <button
              className="btn btn-outline-warning my-2 my-sm-0 ml-1"
              onClick={this.logOut}
              style={{fontFamily: 'Baloo, cursive'}}
            >
              Log Out
            </button>
          </form>
        </nav>
        <nav aria-label="breadcrumb followingGradient">
          <ol className="breadcrumb followingGradient " >
            <li
              className="breadcrumb-item"
              aria-current="page"
              style={{ textAlign: "center", margin: "auto" ,fontFamily: 'Baloo, cursive'}}
            >
              Vacations You Are Following
            </li>
          </ol>
        </nav>
        {this.state.loading ? (
          
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          
        ) : null}
        
        <div className="results">{this.state.followedVacations}</div>
        
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb nofolGradient" style={{ textAlign: "center", margin: "auto" ,fontFamily: 'Baloo, cursive'}}>
            <li
              className="breadcrumb-item"
              aria-current="page"
              style={{ textAlign: "center", margin: "auto" }}
            >
              Other Available Vacations
            </li>
          </ol>
        </nav>
        
        <div className="results">{this.state.vacations}</div>
        
      </div>
    );
  }
}

export default Home;
