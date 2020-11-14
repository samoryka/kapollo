import * as React from "react";
import {FC, MouseEventHandler, Ref} from "react";
import styles from "./Button.module.scss";
import {Text} from "../Text/Text";

export interface ButtonProps {
    onClick?: MouseEventHandler;
    label: string;
    customRef?: Ref<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
}

export const Button: FC<ButtonProps> = ({onClick, label, customRef, disabled = false, className=""}) => (
    <button className={`${styles.Button} ${disabled && styles.disabled} ${className}`}
            onClick={onClick}
            ref={customRef}
            disabled={disabled}>
        <Text className={styles.ButtonText}>{label.toUpperCase()}</Text>
    </button>
);