const ScriptServer = require("scriptserver");
const {
    jarLocation,
    jarArgs,
    rconPort,
    rconPassword,
} = require("../config.json");

class Server {
    constructor() {
        this.server = new ScriptServer({
            core: {
                jar: "../" + jarLocation,
                args: jarArgs,
                rcon: {
                    port: rconPort,
                    password: rconPassword,
                },
            },
        });

        this.server.use(require("scriptserver-event"));

        this.log = {
            type: "log",
            content: new Array()
        };
    }
}


module.exports = Server;