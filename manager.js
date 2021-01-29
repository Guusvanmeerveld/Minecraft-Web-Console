console.clear();

require('colors');

const McServer = require('./src/mcserver');
const mc = new McServer();

const server = require("./src/express");

const Helper = require("./src/helper")
const helper = new Helper();

const { webPassword } = require("./config.json");
const { stop, start } = require("./messages.json");
const ws = require("ws");

var serverStarted = false;

const wss = new ws.Server({ server });

mc.server.on('console', line => {
    mc.log.content.push(line);
    helper.send(mc.log);
});

mc.server.on('start', () => helper.send(start));
mc.server.on('stop', () => helper.send(stop));

wss.on("connection", (ws) => {
    helper.wsConnections.push(ws);

    ws.on('close', () =>
        helper.wsConnections = helper.wsConnections.filter((g) => g != ws)
    );

    ws.on('message', msg => {
        var data = JSON.parse(msg);
        if (data.password == webPassword) {
            switch (data.type) {
                case "start":
                    if (serverStarted) return;

                    serverStarted = true;
                    mc.server.start();
                    helper.send({
                        type: "started",
                        success: true,
                    })
                    break;
                case "stop":
                    if (!serverStarted) return;

                    serverStarted = false;
                    mc.server.stop();
                    helper.send({
                        type: "stopped",
                        success: true,
                    });
                    break;
                case "command":
                    console.log(data.content);
                    mc.server.sendConsole(data.content);
                    break;
                default:
                    break;
            }
        } else {
            helper.send({
                type: "response",
                success: false
            })
        }
    });

    serverStarted ? helper.send(start) : helper.send(stop);
});

helper.info();
setInterval(helper.info, 5000);