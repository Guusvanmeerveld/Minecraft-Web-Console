const q = document.getElementById.bind(document);
const password = localStorage.getItem("password");
var ws = new WebSocket(`wss://${location.host}/websocket`)

var serverConsole = q("serverConsole");
serverConsole.scroll(0, serverConsole.scrollHeight);

ws.addEventListener('message', msg => {
    var data = JSON.parse(msg.data);
    switch (data.type) {
        case "stats":
            q("cpuusage").value = data.cpuUsage;
            q("ramusage").value = data.ramUsage;

            q("cpuusagetext").innerHTML = data.cpuUsage.toPrecision(3) + "%";
            q("cputemptext").innerHTML = data.cpuTemp.toPrecision(3) + " °C";
            q("ramusagetext").innerHTML = data.ramUsage.toPrecision(3) + "%";
            break;
        case "log":
            var console = data.content;
            var consoleText = "";

            console.forEach((line) => {
                consoleText += line + "\n";
            });

            setTimeout(
                () => serverConsole.scroll(0, serverConsole.scrollHeight),
                1
            );

            serverConsole.innerHTML = consoleText;
            break;
        case "stop":
            changeButton("Stop", true, false);
            break;
        case "start":
            changeButton("Start", true, false);
            break;
        case "started":
            changeButton("Stop", false, false);
            changeButton("Start", true, true);
            break;
        case "stopped":
            changeButton("Start", false, false)
            changeButton("Stop", true, true);
            break;
        default:
            break;
    }
})

function changeButton(which, disabled, time) {
    q(`${which.toLowerCase()}Server`).disabled = disabled;
    q(`${which.toLowerCase()}Server`).innerHTML = time ?
        `${which == "Start" ? "Start" : "Stopp"}ing server...` :
        `${which}`;
}

q("startServer").addEventListener('click', () => {
    ws.send(
        JSON.stringify({
            type: "start",
            password,
        })
    );
})

q("stopServer").addEventListener("click", () => {
    ws.send(
        JSON.stringify({
            type: "stop",
            password,
        })
    );
});

q("commandInput").addEventListener('keydown', e => {
    if (e.key == "Enter" && q("commandInput").value) {
        ws.send(
            JSON.stringify({
                type: "command",
                content: q("commandInput").value,
                password,
            })
        );
        q("commandInput").value = null
    }
})

ws.addEventListener('close', () => console.error('WebSocket closed'))