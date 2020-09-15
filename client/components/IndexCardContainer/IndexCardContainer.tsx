import styles from "./IndexCardContainer.module.scss";
import * as React from "react";
import {FC} from "react";

export const IndexCardContainer: FC = ({children}) => <div className={styles.IndexCardContainer}>{children}</div>;