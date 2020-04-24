import React, { Component } from "react";
import axios from "axios";
import { Redirect ,Route} from "react-router-dom";
import Cookies from 'js-cookie';

/// this class corresponds to the '/' route.
// its purpose is to check who is online and redirect him to the right place if he typed 'website.com' + '/' to the address input 
class Check extends Component {
  state = { redirectHome: false, redirectAdmin: false, redirectLogin: false ,isAuth:false};

  // this function will check the role of the user and redirect him to the right place
  checkStatus = () => {
    let jwt = Cookies.get('jwt');
    console.log(jwt);
    var _this_ = this;
    axios
      .get("/api/users/current")
      .then(res => {
        console.log(res.data);
        // _this_.setState({ user: res.data, redirect: false, isAuth: true });
          if (res.data.role ===1) this.setState({redirectAdmin: true,redirectLogin: false,redirectHome: false,isAuth:true });
          if (res.data.role ===0) this.setState({redirectAdmin: false,redirectLogin: false,redirectHome: true });
      })
      .catch(err => {
        console.log(err);
        _this_.setState({ redirectLogin: true, redirectAdmin: false, redirectHome: false });
      });
  };

// automatically the checkStatus function will be invoked
  componentDidMount() {
    this.checkStatus();
  }


  render() {
    const { redirectHome, redirectAdmin, redirectLogin } = this.state;

    if (redirectLogin && !redirectAdmin && !redirectHome)
      return <Redirect to="/login" />;
      if (!redirectLogin && redirectAdmin && !redirectHome)
          return( 
          <div>
          <Redirect to="/admin" />
          </div>);
      if (!redirectLogin && !redirectAdmin && redirectHome)
          return <Redirect to="/home" />;

    return(
      <div></div>
    )
  }
}

export default Check