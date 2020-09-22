# Minecraft Web Console
Minecraft Web Console is a new and better way to interact with your minecraft server via the web.

## Requirements
- [Git](https://git-scm.com/)
- [NodeJS ^8.0.0](https://nodejs.org)

## How to install
Open a terminal in your Minecraft server directory and query the following commands:
```
git clone https://github.com/Guusvanmeerveld/Minecraft-Web-Console
npm install
```
Next, be sure to change [the example config file](config.example.json) to the way you need it and rename it to `config.json`.

**IMPORTANT:** You MUST enable RCON in your minecraft server.properties by otherwise this will NOT work. 
You can enable RCON by adding the following to your server.properties: `enable-rcon=true`, `rcon.password=[YOUR RCON PASSWORD]` and `rcon.port=[YOUR RCON PORT]`.

If you decide to use https you must put a `key.pem` and `cert.pem` in the [`key`](key/) folder.
## Usage
Once you've installed and configured the web console, you can use `npm start` to start the web server. If you're hosting the server locally, you can connect to `http(s)://localhost:[YOUR WEB SERVER PORT]`.

## Feedback & issues
If you have any feedback or issues, click [here](https://github.com/Guusvanmeerveld/Minecraft-Web-Console/issues) submit them.

## Resources

- [Script server](https://www.npmjs.com/package/scriptserver)
- [System information](https://systeminformation.io/)
- [ExpressJS](https://expressjs.com/)
- [WebSocket](https://www.npmjs.com/package/ws)

## License
This project has been licensed under an [MIT license](LICENSE)