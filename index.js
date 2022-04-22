require('dotenv').config();
//import express js into app
const express = require('express');
//import routes controller
const router = require('./src/routes');
//import cors
const cors = require('cors');
//app initialization
const app = express();

//socket io initialization
const http = require('http');
const { Server } = require('socket.io');
//port
const port = 5000;

app.use(express.json());
app.use(cors());

//create socket io server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // define client origin if both client and server have different origin
  },
});
// import socket function and call with parameter io
require('./src/socket')(io);

app.use('/api/v1/', router);
app.use("/uploads", express.static("uploads"));

server.listen(port, ()=>console.log(`Server listening on port ${port}!`));