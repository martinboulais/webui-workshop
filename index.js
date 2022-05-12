const path = require( 'path');
const config = require( './config.js');

const {HttpServer, WebSocket, WebSocketMessage} = require('@aliceo2/web-ui');
const {ApplicationController} = require("./public/lib/ApplicationService");

const http = new HttpServer(config.http, config.jwt, config.oAuth);
const ws = new WebSocket(http);
const applicationService = new ApplicationController();

http.addStaticPath(path.join(__dirname, 'public'));

http.get('/details', applicationService.getDetails);

setInterval(() => {
    ws.broadcast((new WebSocketMessage(200))
        .setCommand('my-command')
        .setPayload({value: Math.floor(Math.random() * 1000)})
    )
}, 5000);