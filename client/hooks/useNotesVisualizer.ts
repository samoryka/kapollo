import {Note, NoteCallback} from "../interfaces";
import {Reducer, useReducer} from "react";

interface NotesState {
    playing: Map<number, Note>;
}

interface NoteAction {
    type: "START" | "STOP";
    note: Note
}

const notesReducer: Reducer<NotesState, NoteAction> = (state: NotesState, action: NoteAction) => {
    const {playing} = state;
    const {type, note} = action;
    switch (type) {
        case "START": {
            const notesAfterAddition = playing.set(note.frequency, note);
            return {playing: notesAfterAddition};
        }
        case "STOP": {
            const notesAfterDeletion = new Map(playing);
            notesAfterDeletion.delete(note.frequency);
            return {playing: notesAfterDeletion};
        }
        default:
            throw new Error(`Unhandled action type: ${type}`);
    }
};

export const useNotesVisualizer = (): [NoteCallback, NoteCallback, number] => {
    const [state, dispatch] = useReducer(notesReducer, {playing: new Map<number, Note>()});

    const displayNote = (note: Note) => dispatch({type: "START", note});
    const hideNote = (note: Note) => dispatch({type: "STOP", note});
    const getOverallVelocity = () => {
        const values = [...state.playing.values()];
        if (values.length === 0) {
            return 0;
        }


        let velocity = values
            .map(note => note.velocity)
            .reduce((acc = 0, curr: number | undefined) => (acc) + (curr || 0));
        velocity = velocity || 0;
        velocity = velocity * 0.75;

        return velocity;
    };

    return [displayNote, hideNote, getOverallVelocity()];
};
