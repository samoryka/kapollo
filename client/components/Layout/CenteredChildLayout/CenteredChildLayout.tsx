import React, {FC} from "react";
import styles from "./CenteredChildLayout.module.scss";

export const CenteredChildLayout: FC = ({children}) => <div className={styles.CenteredChildLayout}>{children}</div>;