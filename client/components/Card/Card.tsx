import * as React from "react";
import {FC} from "react";
import styles from "./Card.module.scss";
import {Heading} from "../Heading/Heading";

export const Card: FC<{ title: string }> = ({title, children}) => (
    <div className={styles.Card}>
        <div className={styles.CardHeading}><Heading>{title}</Heading></div>
        <hr/>
        {children}
    </div>
);