import {Stream} from "../models/Stream";
import {Server} from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import {Note} from "../models/Note";

export default class StreamService {
    private socketServer: Server;
    private readonly streams: Map<String, Stream>;

    constructor(socketServer: Server) {
        this.socketServer = socketServer;
        this.streams = new Map();
    }

    createStream() {
        const streamId: string = uuidv4();
        this.streams.set(streamId, {id: streamId});

        return streamId;
    }

    playNote(streamId: string, note: Note) {
        this.socketServer.to(streamId).emit("note", note);
    }

    stopStream(streamId: string) {
        this.socketServer.in(streamId).clients((error, socketIds) => {
            if (error) {
                throw  error;
            }

            socketIds.forEach(socketId => this.socketServer.sockets[socketId].leave(streamId));
        });

        this.streams.delete(streamId);
    }

    streamExists(streamId: string) {
        return this.streams.has(streamId);
    }
}