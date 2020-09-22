console.clear();

const mcServer = require('./mcserver.js');
const { webServerPort, webPassword, webProtocol } = require("./config.json");
const { stop, start } = require("./messages.json");
const ws = require("ws");
const protocol = require(webProtocol);
const fs = require("fs");

const si = require("systeminformation");
var totalMem;
si.mem().then((d) => (totalMem = d.total));

const express = require("express");
const app = express();

var stats;
var wsConnections = [];
var serverStarted = false;

var serverLog = {
    type: "log",
    content: [],
};

const server = protocol.createServer(
    webProtocol == "https" ? {
        key: fs.readFileSync("./key/key.pem"),
        cert: fs.readFileSync("./key/cert.pem"),
        passphrase: "",
    } :
    null,
    app
);

const wss = new ws.Server({ server });

app.use(express.static('public/'));

getInfo();
setInterval(getInfo, 5000);

async function getInfo() {
    if (wsConnections) {
        var statFun = await Promise.all([
            si.cpuTemperature(),
            si.currentLoad(),
            si.mem(),
        ])
        var cpuTemp = statFun[0].main;
        var cpuUsage = statFun[1].currentload;
        var ramUsage = (statFun[2].used / totalMem) * 100;
        stats = {
            type: "stats",
            cpuTemp,
            cpuUsage,
            ramUsage,
        }
        sendInfo(stats);
    }
}

mcServer.on('console', line => {
    serverLog.content.push(line);
    sendInfo(serverLog);
});

wss.on("connection", (ws) => {
    wsConnections.push(ws);

    ws.on('close', () => {
        wsConnections = wsConnections.filter((g) => g != ws);
    });

    ws.on('message', msg => {
        var data = JSON.parse(msg);
        if (data.password == webPassword) {
            switch (data.type) {
                case "start":
                    if (serverStarted) return;

                    serverStarted = true;
                    mcServer.start();
                    sendInfo({
                        type: "started",
                        success: true,
                    })
                    break;
                case "stop":
                    if (!serverStarted) return;

                    serverStarted = false;
                    mcServer.stop();
                    sendInfo({
                        type: "stopped",
                        success: true,
                    });
                    break;
                case "command":
                    console.log(data.content);
                    mcServer.sendConsole(data.content);
                    break;
                default:
                    break;
            }
        } else {
            sendInfo({
                type: "response",
                success: false
            })
        }
    });

    sendInfo(stats);
    sendInfo(serverLog);
    serverStarted ? sendInfo(start) : sendInfo(stop);
});

mcServer.on('start', e => sendInfo(start));
mcServer.on('stop', e => sendInfo(stop));

function sendInfo(info) {
    wsConnections.forEach((ws) => {
        if (ws.readyState !== ws.OPEN) return;
        ws.send(JSON.stringify(info));
    });
}

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
    console.log("Started web server on port " + webServerPort);
})