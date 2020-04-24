import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classnames from "classnames";
import { message} from 'antd';
import Button from "antd/lib/button";
import "./register.css";
import {Redirect} from 'react-router'


// this class is all about registering the user to the system. 
//In other words, inserting an object of username, first & last name, password to the users table in the DB.

class Register extends React.Component {
  //the state has all the needed information to create new object in the users table in the db
  state = {
    input: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: ""
    },
    errors: {},
    success: false
  };

  // Upon success, this function will display an 'antd' message of success.
  success = () => {
    message.success('Success!!' ,4);
  };

  // this function will handle the input and update the state.
  onChange = e => {
    let { input, errors } = this.state;

    input[e.target.name] = e.target.value;
    errors[e.target.name] = "";

    this.setState({
      input,
      errors
    });
  };

// upon submit the function will send the object in the body of the post request to the server.
  onSubmit = event => { 
    event.preventDefault();
    let _self = this;
    const newRegistryInstance = {
      firstName: this.state.input.firstName,
      lastName: this.state.input.lastName,
      email: this.state.input.email,
      password: this.state.input.password,
      password2: this.state.input.password2
    };
    axios
      .post("/api/users/register", newRegistryInstance)
      .then(res => {
          this.setState({ success: true });
                          this.success()})
      .catch(err => _self.setState({ errors: err.response.data }))
  };

  render() {
    const {
      email,
      firstName,
      lastName,
      password,
      password2
    } = this.state.input;
    const { errors, success } = this.state;

    if (success) {
      return <Redirect to='/login'/>;
    }

    return (

      <div className="row justify-content-center m-5 register">
        <div className="col-md-6">
          <div className="card">
            <header className="card-header">
              <Link
                to="/login"
                className="float-right btn-hover color-2 regbtn mt-1"
              >
                Log in
              </Link>
              <h4 className="card-title mt-2">Sign up</h4>
            </header>
            <article className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-row">
                  <div className="col form-group">
                    <label>First name </label>
                    <input
                      type="text"
                      name="firstName"
                      className={classnames("form-control", {
                        "is-invalid": errors.firstName,
                        "is-valid": firstName.length >= 2
                      })}
                      placeholder=""
                      onChange={e => this.onChange(e)}
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col form-group">
                    <label>Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      className={classnames("form-control", {
                        "is-invalid": errors.lastName,
                        "is-valid": lastName.length >= 2
                      })}
                      placeholder=" "
                      onChange={e => this.onChange(e)}
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className={classnames("form-control", {
                      "is-invalid": errors.email,
                      "is-valid": email.length >= 2
                    })}
                    onChange={e => this.onChange(e)}
                    placeholder=""
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label>Create password</label>
                  <input
                    className={classnames("form-control", {
                      "is-invalid": errors.password,
                      "is-valid": password.length >= 8
                    })}
                    onChange={e => this.onChange(e)}
                    name="password"
                    type="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Confirm password</label>
                  <input
                    className={classnames("form-control", {
                      "is-valid":
                        password2 === password && password2.length >= 8,
                      "is-invalid": errors.password2
                    })}
                    onChange={e => this.onChange(e)}
                    name="password2"
                    type="password"
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <div className="form-group">
                  {/*{success && (*/}
                    {/*<Alert*/}
                      {/*message="Success"*/}
                      {/*description="User is successfully created"*/}
                      {/*type="success"*/}
                      {/*closable={true}*/}
                      {/*banner={true}*/}
                    {/*/>*/}
                  {/*)}*/}
                  <button
                    type="primary"
                    onClick={event => this.onSubmit(event)}
                    className='btn-hover color-7 btn-block'
                  >
                    Register
                  </button>
                </div>
                <small className="text-muted">
                  By clicking the 'Sign Up' button, you confirm that you accept
                  our <br /> Terms of use and Privacy Policy.
                </small>
              </form>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
