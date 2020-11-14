import * as React from "react";
import {FC} from "react";
import styles from "./Heading.module.scss";

type HeadingSize = "h1" | "h2" | "h3";

const headingSizeToClass = (size: HeadingSize) => {
    switch (size) {
        case "h1":
            return styles.h1;
        case "h2":
            return styles.h2;
        case "h3":
            return styles.h3;
        default:
            return "";
    }
};

export const Heading: FC<{ size?: HeadingSize }> = ({children, size = "h1"}) => (
    <span className={`${styles.Heading} ${headingSizeToClass(size)}`}>
        {children}
    </span>
);