import * as React from "react";
import {FC} from "react";
import styles from "./Text.module.scss";

export const Text: FC<{ className?: string; isSecondary?: boolean; }> = ({children, className, isSecondary = false}) =>
    <span className={`${styles.Text} ${isSecondary ? styles.secondary : ""} ${className}`}>{children}</span>;