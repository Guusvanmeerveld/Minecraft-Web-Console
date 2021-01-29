console.clear();

const { readdirSync, writeFileSync, readFileSync } = require("fs");
const readline = require("readline");
const utils = require("./src/utils");
const fork = require('child_process').fork;
require('colors');

console.log("Initializing ".blue + "your minecraft web server!".rainbow);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const exit = () => {
    console.error("Fatal error, quitting".red);
    process.exit();
}

const parseProperties = (content) => {
    let properties = new Map()
    content
        .split("\n")
        .map(i => {
            let props = i.split("=")
            properties[props[0]] = props[1];
        })

    return properties;
}

const encodeProperties = (object) => {
    let string = "";
    for (const [key, value] of Object.entries(object)) {
        if (key || value)
            string += `${key}=${value}\n`;
    }

    return string
}

const getJar = () =>
    new Promise(async res => {
        let files = readdirSync("../").filter(i => i.endsWith(".jar"));

        if (files.length < 1) {
            console.error("Could not find version.jar!")
            exit();
            return;
        }

        let jar = files[0];

        if (files.length == 1) {
            return res(jar);
        }

        console.log("\nFound the following .jar files. Choose the one you want to use, as it will be necessary to start your server.\n".yellow);

        files.forEach((file, i) => {
            console.log(`${i + 1}) ${file}`.green)
        })

        console.log(`\nPlease enter a number between [1-${files.length}]: `.yellow);
        rl.question("=> ", (input) => {
            if (input > files.length || isNaN(input) || input < 1) {
                console.log("\nThat is not a valid number".red);

                return getJar().then(res);
            }

            res(files[input - 1])
        });
    })

const getServerPort = () =>
    new Promise(res => {
        console.log("\nPlease enter the port you want the webserver to run on:".yellow);
        rl.question("=> ", (input) => {
            if (isNaN(input) || input < 1) {
                console.log("\nThat is not a valid number".red);
                return getServerPort().then(res);
            }

            return res(input);
        })
    })

const getPassword = () =>
    new Promise(res => {
        rl.stdoutMuted = true;

        console.log("Please enter a password to access the webserver:".yellow)

        rl.question("=> ", (input) => {
            rl.stdoutMuted = false;
            return res(input);
        });

        rl._writeToOutput = (stringToWrite) => {
            if (rl.stdoutMuted)
                rl.output.write("*");
            else
                rl.output.write(stringToWrite);
        };
    })

const getProtocol = () =>
    new Promise(res => {
        console.log("\nPlease enter the protocol you want to use for the webserver [HTTPS / HTTP]:".yellow)

        rl.question("=> ", (input) => {
            let check = input.toLocaleLowerCase();
            if (check === "http" || check === "https") {
                return res(check)
            }

            console.log("\nThat is not a valid protocol, please choose between [HTTPS / HTTP]".red);
            return getProtocol().then(res);
        })
    })

const setRCON = () =>
    new Promise(res => {
        console.log("\nPreparing finalization...".blue);

        try {
            let content = readFileSync("../server.properties", { encoding: 'utf8', flag: 'r' })

            let properties = parseProperties(content);

            if (properties["rcon.password"].length < 1) {
                properties["rcon.password"] = utils.randomness(10);
            }

            if (properties["rcon.port"].length < 1) {
                properties["rcon.port"] = 25575;
            }

            properties["enable-rcon"] = true

            let string = encodeProperties(properties);
            writeFileSync("../server.properties", string, { encoding: 'utf8', flag: 'w' })

            return res({
                password: properties["rcon.password"],
                port: properties["rcon.port"]
            });
        } catch (error) {
            console.log("\nCould not locate server.properties! Are you sure it exists?\n".red);
            exit();
            return;
        }
    })


const main = async () => {
    let jar = await getJar();
    console.clear();
    console.log(`\nUsing ${jar}`.blue);

    let serverPort = await getServerPort();
    console.clear();
    console.log(`\nRunning on port ${serverPort}\n`.blue);

    let serverPassword = await getPassword();
    console.clear();
    console.log('\nSet the password'.blue);

    let serverProtocol = await getProtocol();
    console.clear();
    console.log(`\nSet the protocol to ${serverProtocol.toUpperCase()}`.blue);

    let rcon = await setRCON();
    console.log(`\nSet the RCON password to ${rcon.password} and port to ${rcon.port}`.blue);

    let config = {
        webServerPort: serverPort,
        webPassword: serverPassword,
        webProtocol: serverProtocol,
        jarLocation: jar,
        jarArgs: [

        ],
        rconPort: rcon.port,
        rconPassword: rcon.password
    }

    writeFileSync("./config.json", JSON.stringify(config), { encoding: 'utf8', flag: 'w' })

    console.log("\nSuccessfully set everything up! If you ever want to reconfigure anything, just run this script again.".green);

    console.log("\nDo you want to start your webserver now? [Y/n]".yellow);

    rl.question("=> ", (input) => {
        if (input.toLowerCase() === "n") {
            console.log("\nOk, setup finished!".green);
            process.exit();
        }

        fork("./manager");
    })
}

main();