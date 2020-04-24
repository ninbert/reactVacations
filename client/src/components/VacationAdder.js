import React from "react";
import FormData from "form-data";
import { Link, Redirect } from "react-router-dom";
import { DatePicker, Button, Upload, Icon, message, PageHeader } from "antd";
import axios from "axios";
import moment from "moment";
import './VacationAdder.css'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

// this component is all about creating a vacation, in other words, insert new values to the database.

class VacationAdder extends React.Component {

  // the state includes all what's needed to be sent to the server.

  state = {
    fileList: [],
    uploading: false,
    title: "",
    location: "",
    startDate: null,
    endDate: null,
    usdPrice: null,
    ilsPrice: null,
    redirectAdmin: false
  };

  // this function will send a form-data object in the body to the server.

  handleUpload = () => {
    message.loading("Upload in progress...", 1);
    let __self__ = this;
    const { fileList } = this.state;
    const formData = new FormData();
    formData.set("title", this.state.title);
    formData.set("location", this.state.location);
    formData.set("startDate", this.state.startDate);
    formData.set("endDate", this.state.endDate);
    formData.set("usdPrice", this.state.usdPrice);
    formData.set("ilsPrice", this.state.ilsPrice);
    fileList.forEach(file => {
      formData.append("myImage", file);
    });
    // formData.forEach(entries => console.log(entries));
    console.log([...formData]);
    this.setState({
      uploading: true
    });

    // You can use any AJAX library you like
    axios
      .post("/api/vacations/createAVacation", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log(res);
        __self__.setState({
          uploading: false,
          successMessage: true,
          redirectAdmin: true
        });
        message.success("Upload Complete", 1);
      })
      .catch(err => console.log(err));
  };

  // this function handles the input of all fields except for the dates fields

  onTitleAndLocationChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

   // this function will hadle the input of the date fields
   
  onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    let depDate = moment(dateString[0]).format("YYYY-MM-DD");
    let arrivalDate = moment(dateString[1]).format("YYYY-MM-DD");
    this.setState({ startDate: depDate, endDate: arrivalDate });
  };

  // onOk = (value) => {
  //     let time = value[0]._d;
  //     console.log('onOk: ', moment(time).format('YYYY-MM-DD'));
  //     ;
  // };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      accept: "image/*",
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
    if (this.state.redirectAdmin) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="row justify-content-center m-5 register">
        <div className="col-md-6">
          <div className="card">
            <PageHeader
              onBack={() => window.history.back()}
              title="Add A Vacation"
            />
            <article className="card-body">
              <form>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter Vacation Title"
                    onChange={e => this.onTitleAndLocationChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>Upload Image</label>
                  <div>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> Select File
                      </Button>
                    </Upload>
                  </div>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="Enter the destination"
                    onChange={e => this.onTitleAndLocationChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>USD Price</label>
                  <input
                    type="text"
                    name="usdPrice"
                    className="form-control"
                    placeholder="Enter USD Price"
                    onChange={e => this.onTitleAndLocationChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label>ILS Price</label>
                  <input
                    type="text"
                    name="ilsPrice"
                    className="form-control"
                    placeholder="Enter ILS Price"
                    onChange={e => this.onTitleAndLocationChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label>Date Range</label>
                  <br />
                  <RangePicker
                    format="YYYY-MM-DD HH:mm"
                    placeholder={["Start Time", "End Time"]}
                    onChange={this.onChange}
                    onOk={this.onOk}
                  />
                </div>
                <div className="form-group">
                  <br />
                  <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                  >
                    Add A Vacation
                  </Button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default VacationAdder;
