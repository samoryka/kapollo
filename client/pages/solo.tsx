import {useInstrument} from "../hooks/useInstrument";
import {useMidiHandler} from "../hooks/useMidiHandler";
import * as React from "react";
import {useEffect} from "react";
import {useNotesVisualizer} from "../hooks/useNotesVisualizer";


const SoloPage = () => {
    const [showNote, hideNotes, getVisibleNotes] = useNotesVisualizer();

    const [synth, playNote, stopNote] = useInstrument();
    const [initializeMidiHandler, removeMidiHandler, midiControllers] = useMidiHandler(
        (note) => {
            playNote(note);
            showNote(note);
        },
        (note) => {
            stopNote(note);
            hideNotes(note);
        }
    );

    useEffect(() => {
        initializeMidiHandler();
        return () => removeMidiHandler();
    }, [synth]);

    return (
        <>
            <h1>Standalone player</h1>
            <h2>Connected controllers &nbsp;:</h2>
            <ul>
                {midiControllers && midiControllers.map(controller => <li
                    key={controller.name}>{controller.name} | {controller.state}</li>)}
            </ul>
            <h2>Instrument:&nbsp;</h2>
            <div><b>{getVisibleNotes() || "*SILENCE*"}</b></div>
        </>
    )

};

export default SoloPage;