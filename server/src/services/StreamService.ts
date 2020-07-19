import {Stream} from "../models/Stream";
import {Server} from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import {Note} from "../models/Note";

enum StreamEvent {
    CONNECTION = "connection",
    JOIN_STREAM = "join_stream",
    START_NOTE = "start_note",
    STOP_NOTE = "stop_note",
}


export default class StreamService {
    private socketServer: Server;
    private readonly streams: Map<String, Stream>;

    constructor(socketServer: Server) {
        this.socketServer = socketServer;
        socketServer.on(StreamEvent.CONNECTION, socket => {
            socket.on(StreamEvent.JOIN_STREAM, streamId => {
                socket.join(streamId)
            })
        });
        this.streams = new Map();
    }

    createStream() {
        const streamId: string = uuidv4();
        this.streams.set(streamId, {id: streamId});

        return streamId;
    }

    startNote(streamId: string, note: Note) {
        this.socketServer.to(streamId).emit(StreamEvent.START_NOTE, note);
    }

    stopNote(streamId: string, note: Note) {
        this.socketServer.to(streamId).emit(StreamEvent.STOP_NOTE, note);
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