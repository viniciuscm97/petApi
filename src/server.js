const express = require('express');
const routes = require('./routes');

const server = express();

server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.listen(3000, () => console.log("Server is running"));