const express = require("express");
const routes = require("./routes.js");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);

app.listen(2222);

console.log("Server running: http://127.0.0.1:2222");
