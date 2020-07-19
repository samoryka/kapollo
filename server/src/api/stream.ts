import * as express from "express";
import {Request, Response} from "express";
import StreamService from "../services/StreamService";
import {getWebSocketPort} from "../utils/ProcessConfig";
import {Server} from "socket.io";
import {Note} from "../models/Note";
import {StreamParamsDictionary} from "../models/api/stream/StreamParamsDictionary";

export const streamController = (socketServer: Server) => {
    const streamController = express.Router();
    const streamService = new StreamService(socketServer);

    streamController.get("/", ((req, res) => {
        res.send({streamUrl: `ws://${req.hostname}:${getWebSocketPort()}`});
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

    streamController.post("/:streamId/play", ((req: Request<StreamParamsDictionary, Note>, res) => {
        const {streamId} = req.params;

        if(!streamService.streamExists(streamId)) {
            errorStreamDoesNotExist(res, streamId);
            return;
        }

        streamService.playNote(req.params.streamId, req.body);
        res.sendStatus(200);
    }));

    return streamController;
};

const errorStreamDoesNotExist = (res: Response, streamId: string) =>
    res.status(500).send({error: `Stream ${streamId} doesn't exist`});