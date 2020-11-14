import styles from "./IndexLinks.module.scss";
import {FC, default as React, forwardRef, Ref} from "react";
import Link from "next/link";
import {Button, ButtonProps} from "../Button/Button";

const ButtonLink = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => (
        <div className={styles.IndexLinksItem}>
            <Button {...props} customRef={ref} className={styles.IndexLinksButton}/>
        </div>
    )
);

export const IndexLinks: FC = () => (
    <div className={styles.IndexLinks}>
        <Link href={"/solo"} passHref><ButtonLink label={"Play solo"}/></Link>
        <Link href={"/stream"} passHref><ButtonLink label={"Stream"}/></Link>
        <Link href={"/listen"} passHref><ButtonLink label={"Listen"}/></Link>
    </div>

);