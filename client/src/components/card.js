import React, { Component } from "react";
import "./card.css";
import { Icon } from "antd";
import axios from "axios";
import moment from 'moment';

class Card extends Component {
  state = {
    userid: this.props.userid,
    id: this.props.id,
    // followRender: "Follow",
    // followIcon: "plus-circle",
    // following: false,
    // buttonColor: "btn btn-info righty"
  };

  followOrNot = () => {
    let propsObj = {
      title:this.props.title,
      key:this.props.id,
      id:this.props.id,
      following:false,
      image:this.props.image,
      start_date:this.props.start_date,
      edit_date:this.props.edit_date,
      end_date:this.props.end_date,
      priceIls:this.props.priceils,
      priceUsd :this.props.priceusd
    }
    if (!this.state.following) {
      propsObj.following = true;
      this.props.moveVacationToFollowing(propsObj);
      this.setState({
        followRender: "Following",
        following: true,
        followIcon: "check",
        buttonColor: "btn btn-success righty"
      });
      let self_ = this;
      axios
        .post("/api/vacations/followTheVacation", {
          vacId: self_.props.id,
          userID: self_.props.userid
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (this.state.following) {
      propsObj.following = false;
      this.props.moveVacationToNotFollowing(propsObj);
      this.setState({
        followRender: "Follow",
        following: false,
        followIcon: "plus-circle",
        buttonColor: "btn btn-info righty"
      });
      let self__ = this;
      axios
        .post("/api/vacations/unFollowTheVacation", {
          vacId: self__.state.id,
          userID: self__.props.userid
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      
    }
  };

  componentDidMount() {
    if(this.props.following){      
      this.setState({
      followRender: "Following",
      following: true,
      followIcon: "check",
      buttonColor: "btn btn-success righty"
    });
    };
    if(!this.props.following){      
      this.setState({
      followRender: "Follow",
      following: false,
      followIcon: "plus-circle",
      buttonColor: "btn btn-info righty"
    });
    };
    this.setState({ userid: this.props.userid, id: this.props.id, following:this.props.following});
    console.log(this.props.userid,this.props.id,this.props.priceusd, this.props.following)
  }

  
  render() {
    const { followRender, followIcon, buttonColor } = this.state;

    return (
      <div
        className="card"
        style={{ width: "90%", height: "300px", gridRowEnd: `span 35` }}
      >
      <img
          className="card-img-bottom2"
          src={this.props.image}
          alt="Card image cap"
        />         
        <div className="card-body">
        <div className='text'>
          <h5 className="cardTitle">{this.props.title}</h5>
          </div>
          <button
            className={buttonColor }
            onClick={this.followOrNot}
            style={{ Color: { buttonColor } }}
          >
            <Icon type={followIcon} className="centeredIcon" />
            {followRender}
          </button>
          <p className="card-text">
          <span className="tag">{this.props.priceusd} $</span>
          </p>
          <p className="card-text date-text " >
        {moment(this.props.start_date).format('LL') } - {moment(this.props.end_date).format('LL')}
        </p>
        
        <p className="card-text bottom-text">
        Last Updated {moment(this.props.edit_date).fromNow()}
        </p>
        </div>
        
        
        
      </div>
    );
  }


  // render() {
  //   const { followRender, followIcon, buttonColor } = this.state;

  //   return (
  //     <div
  //       className="card"
  //       style={{ width: "90%", height: "500px", gridRowEnd: `span 55` }}
  //     >
  //       <div className="card-body">
  //         <h5 className="card-title">{this.props.title}</h5>
  //         <button
  //           className={buttonColor}
  //           onClick={this.followOrNot}
  //           style={{ Color: { buttonColor } }}
  //         >
  //           <Icon type={followIcon} className="centeredIcon" />
  //           {followRender}
  //         </button>
  //         <p className="card-text">
  //         <span className="tag">{this.props.priceusd} $</span>
  //         </p>
  //       </div>
  //       <img
  //         className="card-img-bottom2"
  //         src={this.props.image}
  //         alt="Card image cap"
  //       />         
  //       <p className="card-text date-text " >
  //       {moment(this.props.start_date).format('LL') } - {moment(this.props.end_date).format('LL')}
  //       </p>
        
  //       <p className="card-text bottom-text">
  //       Last Updated {moment(this.props.edit_date).fromNow()}
  //       </p>
        
  //     </div>
  //   );
  // }
}

export default Card;
