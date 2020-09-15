import * as React from "react";
import {FC, MouseEventHandler, Ref} from "react";
import styles from "./Button.module.scss";
import {Text} from "../Text/Text";

export interface ButtonProps {
    onClick?: MouseEventHandler;
    label: string;
    customRef?: Ref<HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({onClick, label, customRef}) => (
    <button className={styles.Button}
            onClick={onClick}
            ref={customRef}>
        <Text className={styles.ButtonText}>{label.toUpperCase()}</Text>
    </button>
);