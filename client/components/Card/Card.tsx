import * as React from "react";
import {FC} from "react";
import styles from "./Card.module.scss";

export const Card: FC<{ title: JSX.Element, className?: string }> = ({title, children, className=""}) => (
    <div className={`${styles.Card} ${className}`}>
        <div className={styles.CardHeading}>{title}</div>
        <hr/>
        {children}
    </div>
);