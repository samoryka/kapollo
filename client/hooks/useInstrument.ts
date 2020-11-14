import {Note, NoteCallback} from "../interfaces";
import {useEffect, useState} from "react";
import {PolySynth, Synth} from "tone";

export const useInstrument = (): [PolySynth | undefined, NoteCallback, NoteCallback] => {
    const [synth, setSynth] = useState<PolySynth>();
    useEffect(() => {
        setSynth(new PolySynth(Synth));
        return () => {
            setSynth(undefined);
        };
    }, []);

    useEffect(() => {
        synth?.toDestination();

        return () => {
            synth?.disconnect();
        };
    }, [synth]);

    const playNote = (note: Note) => {
        synth?.triggerAttack(note.frequency, undefined, note.velocity);
    };

    const stopNote = (note: Note) => {
        synth?.triggerRelease([note.frequency]);
    };

    return [synth, playNote, stopNote];
};