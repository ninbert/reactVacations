//Initial setups.....

const express = require('express');
const bodyParser = require("body-parser");
const passport = require('passport');
const cors = require('cors');
const users = require('./routes/api/users');
const vacations = require('./routes/api/vacations');
const http = require('http');
const socketIO = require('socket.io');
const multiparty = require("multiparty");


// Express Start

const app = express();
const server = http.createServer(app)
// Cors start
let corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

//BodyParser Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Passport Middleware
app.get(passport.initialize());

// Passport Config
require('./config/passportcookie')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/vacations', vacations);

// This creates our socket using the instance of the server
const io = socketIO(server)
app.set('socketio', io);
// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})


const port = process.env.PORT || 5700;
server.listen(port, () => {
    console.log(`server running on port ${port}`);
});

