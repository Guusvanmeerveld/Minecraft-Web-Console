const si = require("systeminformation");
var totalMemory;

si
    .mem()
    .then((d) => (totalMemory = d.total));

class Utils {
    constructor() {
        this.wsConnections = new Array();
    }

    async info() {
        var stats = await Promise.all([
            si.cpuTemperature(),
            si.currentLoad(),
            si.mem(),
        ]);

        var cpuTemp = stats[0].main;
        var cpuUsage = stats[1].currentload;
        var ramUsage = (stats[2].used / totalMemory) * 100;

        return {
            type: "stats",
            cpuTemp,
            cpuUsage,
            ramUsage,
        };
    }

    send(info) {
        this.wsConnections.forEach((ws) => {
            if (ws.readyState !== ws.OPEN) return;
            ws.send(JSON.stringify(info));
        });
    }
}

module.exports = Utils;