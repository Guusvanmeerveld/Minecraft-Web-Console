const ScriptServer = require("scriptserver");
const {
    jarLocation,
    jarArgs,
    rconPort,
    rconPassword,
} = require("./config.json");

const server = new ScriptServer({
    core: {
        jar: jarLocation,
        args: jarArgs,
        rcon: {
            port: rconPort,
            password: rconPassword,
        },
    },
});

server.use(require("scriptserver-event"));

module.exports = server;