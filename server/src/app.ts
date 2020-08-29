import * as dotenv from "dotenv";
import * as express from "express";
import * as process from "process";
import * as cors from "cors";
import * as io from "socket.io";
import {streamController} from "./api/stream";

dotenv.config();
const {NODE_ENV, API_PORT, WEBSOCKET_PORT, CLIENT_URL} = process.env;

const socketIo = io(WEBSOCKET_PORT, {path: ""});

const app = express();
app.use(express.json());
app.use(cors({
    origin: CLIENT_URL,
    optionsSuccessStatus: 200
}));
app.use("/stream", streamController(socketIo));

const server = app.listen(API_PORT, () => {
    console.log("Kapollo Server started");
    console.log(`Environment:${NODE_ENV}`);
    console.log(`Main server port:${API_PORT}`);
    console.log(`Websocket server port:${WEBSOCKET_PORT}`);
});

process.on("SIGTERM", () => {
    server.close(() => console.log("Kapollo Server terminated"));
    socketIo.close(() => console.log("Kapollo Server terminated"));
});