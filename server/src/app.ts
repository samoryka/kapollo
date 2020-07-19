import * as express from "express";
import * as process from "process";
import * as io from "socket.io";

import {streamController} from "./api/stream";

import {getPort, getWebSocketPort} from "./utils/ProcessConfig";

const socketIo = io(getWebSocketPort(), {path: ""});

const app = express();
app.use(express.json());
app.use("/stream", streamController(socketIo));

const server = app.listen(getPort(), () => {
    console.log("Kapollo Server started");
    console.log(`Environment:${process.env.NODE_ENV}`);
    console.log(`Main server port:${getPort()}`);
    console.log(`Websocket server port:${getWebSocketPort()}`);
});

process.on("SIGTERM", () => {
    server.close(() => console.log("Kapollo Server terminated"));
    socketIo.close(() => console.log("Kapollo Server terminated"));
});