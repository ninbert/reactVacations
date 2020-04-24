
// This "vacations" Route will take responsibilty regarding all available functions for handling interface of vacations: Adding, Deleting, Editing, Following, Unfollowing.....


const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const checkVacationFields = require("../../validation/checkVacationFields.js");
const multer = require("multer");
const path = require("path");
const keys = require("../../config/keys");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const isEmpty = require("../../validation/isEmpty")
const moment = require("moment")


//  saving important paths for working with upload to substract from absolute paths.
const destination = "./client/public/Uploads";
const absoulteHtmlPath = "client/public/";


const storage = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage: storage }).single("myImage");



//ConnectToDB
const con = mysql.createConnection({
  host: keys.LOCAL_ENDPOINT,
  port: keys.LOCAL_PORT,
  user:  keys.LOCAL_USER,
  password: keys.LOCAL_PASS,
  database: keys.LOCAL_DBNAME
});

router.get("/test", (req, res) => {
  res.json({ msg: "vacation works" });
});


// this method will print all vacations on screen - for the admin ONLY.
// The function uses mySQL syntax to query the database and send a json object to the client with all available vacations.
// The function receives the logged-in user id.
// Since a following or not following indicator should be present, --
// - A complex mySQL query is used to add a table with "following" field that will indicate if the specific vacation in the tables is "followed".
// It's neccessary in order to populate the client's table of "followed" vacations.
router.post("/getAllVacations", (req, res) => {
  let filteredResult = [];
  userID = req.body.userID;
  console.log("body is", req.body);
  // console.log("received userID is", userID);
  const query = `SELECT vacation.id,vacation.title,vacation.image,vacation.start_date,vacation.end_date,vacation.price_usd,vacation.location,vacation.price_nis,vacation.description,vacation.edit_date, users_vacation.user_id,users_vacation.vacation_id FROM ${keys.LOCAL_DBNAME}.vacation LEFT JOIN ${keys.LOCAL_DBNAME}.users_vacation ON ${keys.LOCAL_DBNAME}.users_vacation.vacation_id = ${keys.LOCAL_DBNAME}.vacation.id AND ${keys.LOCAL_DBNAME}.users_vacation.user_id = ${userID}`;
  con.query(query, function(err, result, fields) {
    if (err) throw err;
    filteredResult = result.map(vacation => {
      if (vacation.vacation_id !== null || vacation.vacation_id !== undefined) {
        vacation.followingStatus = true;
      }
      if (vacation.vacation_id === null || vacation.vacation_id === undefined) {
        vacation.followingStatus = false;
      }
      return vacation;
    });
    console.log({ filtered: filteredResult });

    res.json(filteredResult);
  });
});

// This method will "follow" a given vacation. 
// The function receives user id and vacation id and add them to the table of all followed vacations by the registered users

router.post("/followTheVacation", (req, res) => {
  let vacid = req.body.vacId;
  let userid = req.body.userID;

  con.query(
    `INSERT INTO users_vacation(user_id, vacation_id) VALUES ("${userid}","${vacid}")`,
    function(err, result, fields) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// This function will receive a ruquest of a special SQL syntax query that will populate the chart component.
// The complex query will generate a table with 3 columns: vacation_id, vacation_name and following count.

router.get("/getFollowingForChart", (req, res) => {
  let _query_ = `SELECT id, title,following FROM vacation
                    LEFT JOIN (
                                       SELECT vacation_id, count(*) AS following
                                       FROM users_vacation
                                       GROUP BY vacation_id
                                      ) following ON following.vacation_id = vacation.id
                    ORDER BY following DESC`;
  con.query(_query_ , (err,result,fields) => {
    if (err) throw err 
    res.status(200).json(result);
  });
});

// this method will Delete the vacation from the database.
// It will receive the vacation id from the admin panel and pass it in DELETE query.
router.post("/deleteTheVacation", (req, res) => {
  let vacid = req.body.vacationID;
  let query_t1 = `DELETE FROM vacation WHERE vacation.id = ${vacid}`;
  let query_t2 = `DELETE FROM users_vacation WHERE users_vacation.vacation_id = ${vacid}`
  console.log(vacid);
  con.query(query_t1, (err_t1, result_t1, fields) => {
    if (err_t1) throw err_t1;
    con.query(query_t2 , (err_t2,result_t2,fields) => {
      if (err_t2) throw err_t2
      res.status(200).json({result_t2})
    })
  });
});

// This method will "unfollow" a given vacation. 
// The function receives user id and vacation id and delete them to the table of all followed vacations by the registered users

router.post("/unFollowTheVacation", (req, res) => {
  let vacid = req.body.vacId;
  let userid = req.body.userID;
  console.log(userid, vacid, "unfollow");
  let query_ = `DELETE FROM users_vacation WHERE user_id=${userid} AND vacation_id =${vacid}`;
  con.query(query_, function(err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

// Tthis function will format any given date-format to the format that is used by the mySQL table which is MM-DD-YYYY.

toDate = (value) => {

let newDate = new Date (value);
let timeStamp = newDate.getTime();
let momentDate = moment(timeStamp).format("YYYY-MM-DD");
console.log(momentDate)
return momentDate
}

// This method will edit the vacation requested by the user.
// It receives all available data from the user in a json body object and Updates the vacation in the vacations table.

router.post("/editVacation", (req,res) => {
  // Since we have an image coming in form-data object we need to use the upload function that is coming with the multer package.
  // the upload function is able to parse and decode the form-data object.
  
  upload (req,res, (error) => {
    if (error) {
      res.status(400).json(error);
    }
    else {
      let payload = {  
      title : req.body.title, 
      location:req.body.location,
      startDate : toDate(req.body.startDate),
      endDate : toDate(req.body.endDate),
      usdPrice : Number(req.body.usdPrice),
      ilsPrice : Number(req.body.ilsPrice),
      image :req.body.oldImage,
      id:Number(req.body.vacId)
    }
      console.log(payload)
      if (!isEmpty(req.file)) {
        console.log(req.file)
        let fileObj = req.file
        console.log("file ",fileObj)
        payload.image = path.relative(absoulteHtmlPath , fileObj.path)
      }
      // This method will import the socketIO object from the initial server.js file and emit it to the user
      let vacSocket = req.app.get('socketio');
      vacSocket.emit('VACATION_EDITED', payload);
      con.query(
        `UPDATE vacation SET title="${payload.title}", location="${payload.location}", image="${
          payload.image
        }" , start_date=' ${payload.startDate}', end_date='${payload.endDate}' , price_usd=${payload.usdPrice} , price_nis=${payload.ilsPrice}, description="Description"
        WHERE id=${payload.id}`,
        (err, result, fields) => {
          if (err) throw err;
          response = { result, msg: "Vacation Successfully Edited" };
          console.log(response);
          res.status(200).json(response);
        }
      );
    }
  });
})

// This method will create new vacation requested by the user.
// It receives all available data from the user in a json body object and inserts the vacation object in the vacations table.

router.post("/createAVacation", (req, res) => {
    // Since we have an image coming in form-data object we need to use the upload function that is coming with the multer package.
  // the upload function is able to parse and decode the form-data object.
  upload (req,res, (error) => {
    if (error) {
      res.status(400).json(error);
    }
    else {
      let title = req.body.title;
      let location = req.body.location;
      let startDate = req.body.startDate;
      let endDate = req.body.endDate;
      let usdPrice = req.body.usdPrice;
      let ilsPrice = req.body.ilsPrice;
      let fileObj = req.file
      let newImage = path.relative(absoulteHtmlPath , req.file.path)
      console.log("file ",fileObj);
      con.query(
        `INSERT INTO vacation( title, location, image , start_date , end_date , price_usd , price_nis, description) VALUES("${title}","${location}","${
          newImage
        }","${startDate}","${endDate}","${usdPrice}","${ilsPrice}","description")`,
        (err, result, fields) => {
          if (err) throw err;
          response = { result, msg: "New Vacation successfully created" };
          console.log(response);
          res.status(200).json(response);
        }
      );
    }
  });
});

module.exports = router;
