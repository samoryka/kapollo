import styles from "./PlayerScreenLayout.module.scss";
import * as React from "react";
import {FC} from "react";

export const PlayerScreenLayout: FC = ({children}) => (
    <div className={styles.PayerScreenLayout}>
        {children}
    </div>
);

export const PlayerScreenItem: FC<{fillRemainingSpace?: boolean}> = ({children, fillRemainingSpace = false}) => (
    <div className={`${styles.Item} ${fillRemainingSpace ? styles.fillRemainigSpace : ""}`}>
        {children}
    </div>
);