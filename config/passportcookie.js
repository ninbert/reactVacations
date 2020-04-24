//importing some important modules......


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt =  require('passport-jwt').ExtractJwt;
const keys = require("./keys");
// const mongoose = require ('mongoose');
const mysql = require('mysql');
// const User = mongoose.model('users');

//ConnectToDB ....
const con = mysql.createConnection(
    {
      host: keys.LOCAL_ENDPOINT,
      port: keys.LOCAL_PORT,
      user:  keys.LOCAL_USER,
      password: keys.LOCAL_PASS,
      database: keys.LOCAL_DBNAME
    },
  );
  
 // this method is a self created method. 
 //It will take the req(body) and extract the jwt token from the cookie and return it to the opts object below.

let cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};

// opts is an object that needs to be passed with the jwt-strategy instance declaration.
// It contains two proprties, jwtFromRequest which cointains the hashed jwt-token itself and secretOrKey which is just a word.
const opts = {};

//Using the method above, jwtFromRequest will be populated with a hashed token
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = 'secret';


module.exports = passport => {

    // There we will use the strategy and get the jwt_payload from the strategy. We pass the token and get the users data.
    // We will return the users' name, email, role, and id to the client.
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // After we send the opts object we get jwt-payload object as a response with a callback function. 
        // We will now check if the id property exists in the database.
        console.log(jwt_payload)
            con.query(`SELECT first_name, mail, id, role FROM users WHERE id = "${jwt_payload.id}"`, function (
                err,
                result,
                fields
                ) {
                    console.log(result)
                    // if there is a valid response from the database we will return "done" and return the active user to the client.
                    if (result.length > 0) {
                        return done(null, result);
                     } else return done(null, false);
                }
            );
        }
    )
    )
};