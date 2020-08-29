import {Note, NoteCallback} from "../interfaces";
import {useEffect, useState} from "react";
import {context, PolySynth, Synth} from "tone";

export const useInstrument = (): [PolySynth | undefined, NoteCallback, NoteCallback] => {
    const [synth, setSynth] = useState<PolySynth>();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        setSynth(new PolySynth(Synth));
    }, []);

    const initialize = () => {
        if (context.state !== "running") {
            context.resume().then(() => {
                synth?.toDestination();
                setIsInitialized(true);
            });
        }
    };

    const playNote = (note: Note) => {
        if (!isInitialized) {
            initialize();
        }
        synth?.triggerAttack(note.frequency, undefined, note.velocity);
    };

    const stopNote = (note: Note) => {
        synth?.triggerRelease([note.frequency]);
    };

    return [synth, playNote, stopNote];
};