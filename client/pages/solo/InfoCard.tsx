import {default as React, Dispatch, FC} from "react";
import {Button} from "../../components/Button/Button";
import styles from "./InfoCard.module.scss";
import {Text} from "../../components/Text/Text";
import {Card} from "../../components/Card/Card";
import {Heading} from "../../components/Heading/Heading";
import {PlayerScreenItem} from "../../components/Layout/PlayerScreenLayout/PlayerScreenLayout";

const InfoCard: FC<{ started: boolean, setStarted: Dispatch<boolean>, midiControllers?: WebMidi.MIDIPort[] }> = ({started, setStarted, midiControllers}) => (
    <PlayerScreenItem>
        <Card title={<Heading size={"h2"}>Standalone Player</Heading>}>
            <div className={styles.Instruments}>
                <Heading size={"h3"}>Instrument</Heading>
                <Button label={started ? "Started" : "Start"} onClick={() => setStarted(!started)} disabled={started}/>
            </div>
            <div className={`${styles.OtherInfo} ${started ? "" : styles.hidden}`}>
                {midiControllers &&
                <>
                    <hr/>
                    <div className={styles.MidiInputs}>
                        <Heading size={"h3"}>MIDI Controllers</Heading>
                        {midiControllers!.map(controller => (
                                <div key={controller.name} className={styles.MidiInput}>
                                    <Text isSecondary={controller.state !== "connected"}>{controller.name}</Text>
                                </div>
                            )
                        )}
                    </div>
                </>
                }
            </div>
        </Card>
    </PlayerScreenItem>
);

export default InfoCard;