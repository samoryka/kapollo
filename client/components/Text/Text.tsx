import * as React from "react";
import {FC} from "react";
import styles from "./Text.module.scss";

export const Text:FC<{className?: string}> = ({children, className}) => <span className={`${styles.Text} ${className}`}>{children}</span>;