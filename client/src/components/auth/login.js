import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";
import {Redirect} from "react-router"
import {message,Button} from 'antd'
import Cookies from 'universal-cookie'
import "./register.css"


// This class is responsible for the login screen that will send the username and password to the server.
class Login extends Component {

  state = { input:{email: "", password: ""}, errors: {}, token:null, redirectHome: false, redirectAdmin:false, loading:false };

// this method will handle the input from the user and update the state
  onChange = e => {let { input, errors } = this.state;

    input[e.target.name] = e.target.value;
    errors[e.target.name] = "";

    this.setState({
      input,
      errors
    });
  };


  // this method is called after the onSubmit method. Please refer to it below before.
  // this function is the double-check of the login method. it send a get request to the /current method.
  // after the response it determines who is the user and doing the redirection to the corresponding component.
  // f.e if the user role in the response is '0' then it appears that the user is regular user and not an admin, he will be redirected to the HomeComponent
  checkStatus = () => {
    var _this__ = this;
    axios
        .get("/api/users/current" )
        .then(res => {
          console.log("got")
          if (res.data.role === 0 ) {
            _this__.setState({redirectHome: true, redirectAdmin:false, loading:false});
            message.success('Successfully Logged In', 3);
          }
          if (res.data.role === 1 ){

            _this__.setState({redirectHome: false, redirectAdmin:true, loading:false});
            message.success('Successfully Logged In', 3);
          };
          // _this__.setState({ user: res.data, redirect: false, isAuth: true });
        })
        .catch(err => {
          console.log(err);
        });

  };

// this method will send the username and password to the server and get a response. 
// If the response is successful then it will call the checkStatus method.

  onSubmit = event => {
    event.preventDefault();
    this.setState({loading:true});
    message.loading('Logging You In..', 0.5);
    let myToken = '';
    const _self = this;
    const newLoginInstance = {
      email: this.state.input.email,
      password: this.state.input.password
    };
    axios
        .post("/api/users/login", newLoginInstance)
        .then(res => {
          // we need to store a token for automatic access in the active window of the json web token. 
          // Therefore, we need to store it in the local storage so the '/current' method in the server will be able to access it and parse it.
          myToken =res.data.token;
          const cookies = new Cookies();
          cookies.set('jwt', myToken, { path: '/' });   
          console.log(cookies.get('jwt')); 
          console.log(res);
          this.checkStatus();
        })
        .catch(
            err => {
              console.log(err);
              _self.setState({ errors: err.response.data, loading:false })
            });
  };


  render() {

    const {errors,  redirectAdmin , redirectHome, loading} = this.state;

    if (redirectHome && !redirectAdmin) return <Redirect to="/home"/>;
    if (!redirectHome && redirectAdmin) return <Redirect to="/admin"/>;


    return (

      <div className="row justify-content-center m-5">
        <div className="col-md-6">
          <div className="card">
            <header className="card-header align-items-center">
              <Link
                to="/register"
                className="float-right btn-hover color-2 regbtn mt-1"
              >
                Register
              </Link>
              <h4 className="card-title mt-2">Login</h4>
            </header>
            <article className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={e => this.onChange(e)}
                    className={classnames('form-control', {'is-invalid': errors.email})}
                    placeholder=""
                  />
                    {errors.email && ( <div className="invalid-feedback">{errors.email}</div>) }
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                      className={classnames('form-control', {'is-invalid': errors.password})}
                    onChange={e => this.onChange(e)}
                    name="password"
                    type="password"
                  />
                    {errors.password && ( <div className="invalid-feedback">{errors.password}</div>) }
                </div>
                <div className="form-group">
                  <button type="primary" onClick={this.onSubmit} className="btn-hover color-7 btn-block">
                    {" "}
                    {loading? <i className="fas fa-spinner fa-spin"></i> : 'Login'  }
                    
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
