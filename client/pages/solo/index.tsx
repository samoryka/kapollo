import {useInstrument} from "../../hooks/useInstrument";
import {useMidiHandler} from "../../hooks/useMidiHandler";
import * as React from "react";
import {useEffect, useState} from "react";
import {useNotesVisualizer} from "../../hooks/useNotesVisualizer";
import Head from "next/dist/next-server/lib/head";
import {Background} from "../../components/Background/Background";
import {PlayerScreenLayout} from "../../components/Layout/PlayerScreenLayout/PlayerScreenLayout";
import {InfoCard} from "./InfoCard";
import {NotesVisualizer} from "./NotesVisualizer";


const SoloPage = () => {
    const [started, setStarted] = useState(false);

    const [showNote, hideNote, notesVelocity] = useNotesVisualizer();

    const [synth, playNote, stopNote] = useInstrument();
    const [initializeMidiHandler, removeMidiHandler, midiControllers] = useMidiHandler(
        (note) => {
            playNote(note);
            showNote(note);
        },
        (note) => {
            stopNote(note);
            hideNote(note);
        }
    );

    useEffect(() => {
        if (started) {
            initializeMidiHandler();
        }
        return () => {
            removeMidiHandler();
        };
    }, [synth, started]);

    return (
        <>
            <Head>
                <title>Kapollo - Play Solo</title>
            </Head>
            <Background isSecondary={true}>
                <PlayerScreenLayout>
                    <InfoCard started={started} setStarted={setStarted} midiControllers={midiControllers}/>
                    {started && <NotesVisualizer velocity={notesVelocity}/>}
                </PlayerScreenLayout>
            </Background>
        </>
    )

};

export default SoloPage;