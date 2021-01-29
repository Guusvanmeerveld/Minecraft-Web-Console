require('colors');

const utils = require("./utils");

const { webServerPort, webProtocol, webPassword } = require("../config.json");

const protocol = require(webProtocol);

const express = require("express");
const app = express();

const fs = require("fs");

const server = protocol.createServer(
    webProtocol == "https" ? {
        key: fs.readFileSync("./key/key.pem"),
        cert: fs.readFileSync("./key/cert.pem"),
        passphrase: "",
    } :
        null,
    app
);

app.use(express.static('public/'));

app.post("/api/password", (req, res) => {
    if (req.headers["password"] == webPassword) {
        res.json({
            success: true
        })
    } else {
        res.end("")
    }
})

server.listen(webServerPort, () => {
    let ipv4 = utils.ipv4().eth0[0];

    console.log(`Started web server, head on over to ${webProtocol}://${ipv4}:${webServerPort} to check it out!`.blue);
})

module.exports = server;