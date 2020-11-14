import {default as React, FC} from "react";
import {PlayerScreenItem} from "../../components/Layout/PlayerScreenLayout/PlayerScreenLayout";
import styles from "./NotesVisualizer.module.scss";

export const NotesVisualizer: FC<{ velocity: number }> = ({velocity}) => {
    const maxSize = velocity > 0 ? (velocity * 100).toFixed(2) : 100;

    return (
        <PlayerScreenItem fillRemainingSpace>
            <div className={styles.NotesVisualizer}>
                <div className={styles.Container}>
                    <div style={{
                        maxHeight: `${maxSize}%`,
                        maxWidth: `${maxSize}%`
                    }}
                         className={`${styles.Indicator} ${velocity > 0 ? styles.on : ""}`}/>
                </div>
            </div>
        </PlayerScreenItem>
    );
};