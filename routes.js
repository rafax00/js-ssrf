const url = require("url");
const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
    console.log("Connection received: " +  req.connection.remoteAddress);

    return res.sendFile("./htmls/js-exploits.html", {root:__dirname});
});

routes.get("/log", (req, res) => {
    console.log("Connection received: " +  req.connection.remoteAddress);

    console.log(req.url);

    return res.send("Ok");
});

routes.get("/openredirect*", (req, res) => {
    console.log("Connection received: " +  req.connection.remoteAddress);

    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;

    var redirectUrl = query.url;

    if (redirectUrl != undefined){
        return res.redirect(redirectUrl);
    }else{
        return res.send("Missing 'url' parameter.");
    }
});

module.exports = routes;
