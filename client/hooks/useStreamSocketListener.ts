import {useEffect, useState} from "react";
import io from 'socket.io-client';
import {Note, StreamEvent} from "../interfaces";

const {WEBSOCKET_URL} = process.env;

export const useStreamSocketListener = (onNoteStarted: (note: Note) => void, onNoteStopped: (note: Note) => void) => {
    const [socket] = useState(io(WEBSOCKET_URL));

    useEffect(() => {
        socket.connect();
        socket.on(StreamEvent.START_NOTE, onNoteStarted);
        socket.on(StreamEvent.STOP_NOTE, onNoteStopped);
    }, [socket, onNoteStarted, onNoteStopped]);

    const joinStream = (streamId?: string) => {
        if (streamId) {
            socket.emit(StreamEvent.JOIN_STREAM, streamId);
        }
    };

    return joinStream;
};