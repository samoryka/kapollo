import * as React from "react";
import {FC} from "react";
import styles from "./Background.module.scss";

export const Background: FC<{ className?: string; isSecondary?: boolean; }> = ({children, className = "", isSecondary = false}) => (
    <div className={`${styles.Background} ${isSecondary ? styles.secondary : ""} ${className}`}>
        {children}
    </div>
);