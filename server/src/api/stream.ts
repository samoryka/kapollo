import * as express from "express";
import {Request, Response} from "express";
import * as process from "process";
import StreamService from "../services/StreamService";
import {Server} from "socket.io";
import {Note} from "../models/Note";
import {StreamParamsDictionary} from "../models/api/stream/StreamParamsDictionary";

export const streamController = (socketServer: Server) => {
    const streamController = express.Router();
    const streamService = new StreamService(socketServer);

    streamController.get("/", ((req, res) => {
        res.send({streamUrl: `ws://${req.hostname}:${process.env.WEBSOCKET_PORT}`});
    }));

    streamController.post("/", ((req, res) => {
        const id = streamService.createStream();
        res.send({streamId: id});
    }));

    streamController.delete("/:streamId", ((req: Request<StreamParamsDictionary>, res) => {
        const {streamId} = req.params;

        if (!streamService.streamExists(streamId)) {
            errorStreamDoesNotExist(res, streamId);
            return;
        }
        streamService.stopStream(streamId);
        res.sendStatus(200);
    }));

    streamController.post("/:streamId/note/:action", ((req: Request<StreamParamsDictionary, Note>, res) => {
        const {streamId, action} = req.params;
        const note = req.body;

        if (!streamService.streamExists(streamId)) {
            errorStreamDoesNotExist(res, streamId);
            return;
        }

        switch (action) {
            case "start":
                streamService.startNote(streamId, note);
                break;
            case "stop":
                streamService.stopNote(streamId, note);
                break;
        }
        res.sendStatus(200);
    }));

    return streamController;
};

const errorStreamDoesNotExist = (res: Response, streamId: string) =>
    res.status(500).send({error: `Stream ${streamId} doesn't exist`});