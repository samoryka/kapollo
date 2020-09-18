import {AppProps} from 'next/app';
import "../styles/index.scss";
import Head from "next/head";
import * as React from "react";

const MyApp = ({Component, pageProps}: AppProps) => (
    <>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans&display=swap" rel="stylesheet"/>
        </Head>
        <Component {...pageProps} />
    </>
);

export default MyApp;