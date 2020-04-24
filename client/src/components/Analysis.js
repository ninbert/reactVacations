import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { PageHeader, Spin } from "antd";
import "./analysis.css";
import Axios from "axios";

// The analysis class is getting information fetched from the server.
// It's purpose is to show the following quantity of each vacation and display it to the admin. 
export default class Analysis extends Component {

  // the state is consisting of chartData which store all the data necessary to display the chart.
  // and the dataPopulated boolean property that states if its true then display the table - otherwise, display a spinner.
  state = {
    chartData: {}, dataPopulated:false,
  };


  // this function will return a randomized rgb(0-256,0-256,0-256) color and opacity.
  // it is invoked in the populateChart function.
  randomChartColor = () => {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let color = "rgb(" + x + "," + y + "," + z + ",0.6)";
    return color;
  };

  // increase = () => {
  //   let percent = this.state.percent + 10;
  //   if (percent > 100) {
  //     percent = 100;
  //   }
  //   this.setState({ percent });
  // };



// this function's prupose is to populate the 'chartData' object in the state.
// it is invoked when the component mounts right after it gets info from the server
// it receives the server data as an argument
  populateChart = resData => {
    // as the dataObject itself is initialized by the chart.js library, we will need 3 arrays to store data.
    // labels array , values array and colors array.
    
    let labels = [];
    let colors = [];
    let values = [];
    // using forEach method we will push the response argument to the arrays above.
    resData.forEach(vacation => {
      labels.push(vacation.title);
      values.push(vacation.following);
      colors.push(this.randomChartColor());
    });
    let dataObject = {
      labels: labels,
      datasets: [
        {
          label: "Following",
          data: values,
          backgroundColor: colors
        }
      ]
    };
    this.setState({ chartData: dataObject, dataPopulated:true });
  };

  componentDidMount() {
    // when the component starts we will get an axios request to fetch data for the chart from the server
    Axios.get("/api/vacations/getFollowingForChart")
      .then(res => {
        console.log(res);
        this.populateChart(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  

  render() {
    return (
      <div className="wrapper">
        <div className="overlay"></div>
        <div className="modall">
        <div className="analysis">
          <PageHeader
            onBack={() => window.history.back()}
            title="Analysis"
            subTitle="See How Much Followers Following Our Vacations"
          />
        </div>
        {this.state.dataPopulated ?
        <div className="chart-container">
          <Bar
            data={this.state.chartData}
            options={{}}
          /> </div>: <div className="progress"><Spin size="large" /></div>}
      </div>
      </div>
    );
  }
}
