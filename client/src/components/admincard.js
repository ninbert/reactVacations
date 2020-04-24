import React, { Component } from "react";
import "./card.css"
import {Icon, Popconfirm, message, Modal} from "antd"
import axios from "axios";
import {Link} from 'react-router-dom';

// this class is responsible for displaying the vacation card in the admin panel
class AdminCard extends Component {
    
    // this function will delete the vacation from the database.
    confirmDelete = () => {
        //this function will invoke the parent function in the admin panel component to delete the vacation itself from the array of vacationsand hide it.
        this.props.clearCard(this.props.vacationID);
            axios.post("/api/vacations/deleteTheVacation",{vacationID:this.props.vacationID})
            .then(res => {
                //upon success the antd message will be displayed.
                message.success('Vacation Successfully Deleted.');

            })
            .catch(err => {
                console.log(err)
            });
    }



    render(){
        let propsObj = {title:this.props.title,id:this.props.vacationID,data:this.props.vacationData};
        return (
            <div className="card" style={{width:'90%' , height:'300px', gridRowEnd:`span 35`}}>
            <img className="card-img-bottom2"  src={this.props.image} alt="Card image cap"/>
                <div className="card-body">
                <div className='text'>
                    <h5 className="cardTitle">{this.props.title} , {this.props.vacationID}</h5>
                    </div>
                    <div className="edit-buttons">
                    <Link to={{pathname:"/edit-vacation/vacationID="+this.props.vacationID+"vacationName="+this.props.title, state:propsObj}}><button className="btn btn-info " style={{fontFamily: 'Baloo, cursive'}}><Icon type="edit" className="centeredIcon"/>Edit </button></Link>
                    <Popconfirm
                        placement="bottomRight"
                        title="Are You Sure?"
                        onConfirm={this.confirmDelete}
                        okText="Yes"
                        cancelText="No"
                         >
                    <button className="btn btn-danger spaced" style={{fontFamily: 'Baloo, cursive'}}><Icon type="delete" className="centeredIcon"/>Delete</button>
                    </Popconfirm>
                    </div>
                    <p className="card-text">{this.props.description}</p>
                    <p className="card-text">
                    </p>
                </div>
                

            </div>
        )
    }


}


export default AdminCard