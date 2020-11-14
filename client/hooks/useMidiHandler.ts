import {useState} from "react";
import {NoteCallback} from "../interfaces";

const midiNoteToFrequency = (midiNote: number) => Math.pow(2, (midiNote - 69) / 12) * 440;
const midiVelocityToVelocity = (midiVelocity: number) => midiVelocity / 128;

export const useMidiHandler = (onKeyUp: NoteCallback, onKeyDown: NoteCallback): [() => void, () => void, WebMidi.MIDIInput[] | undefined] => {
    const [midiControllers, setMidiControllers] = useState<WebMidi.MIDIInput[]>();

    const handleControllerMidiMessage = (message: WebMidi.MIDIMessageEvent) => {
        const [command, key, velocity] = message.data;
        const note = {
            frequency: midiNoteToFrequency(key),
            velocity: midiVelocityToVelocity(velocity)
        };

        if (command === 144) {
            onKeyUp(note);
        } else if (command === 128) {
            onKeyDown(note);
        }
    };

    const setupControllers = (access: WebMidi.MIDIAccess) => {
        const controllers = Array.from(access.inputs.values());
        setMidiControllers(controllers);
        controllers.map(input => input.onmidimessage = handleControllerMidiMessage);
    };

    const initializeMidiHandler = () => {
        navigator.requestMIDIAccess()
            .then(
                access => {
                    access.addEventListener("statechange", () => setupControllers(access));
                    setupControllers(access);
                },
                failure => {
                    console.log("Couldn't get MIDI Access", failure);
                }
            );
    };

    const removeMidiHandler = () => {
        navigator.requestMIDIAccess()
            .then(
                access => {
                    const controllers = Array.from(access.inputs.values());
                    controllers.map(input => delete input.onmidimessage);
                },
                failure => {
                    console.log("Couldn't get MIDI Access", failure);
                }
            );
    };

    return [initializeMidiHandler, removeMidiHandler, midiControllers];
};