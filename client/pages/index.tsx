import * as React from "react";
import {Background} from "../components/Background/Background";
import {CenteredChildLayout} from "../components/Layout/CenteredChildLayout/CenteredChildLayout";
import {Card} from "../components/Card/Card";
import {IndexLinks} from "../components/IndexLinks/IndexLinks";
import {IndexCardContainer} from "../components/IndexCardContainer/IndexCardContainer";
import Head from "next/head";

const IndexPage = () => (
    <>
        <Head>
            <title>Kapollo</title>
        </Head>
        <Background isSecondary={true}>
            <CenteredChildLayout>
                <IndexCardContainer>
                    <Card title={"Kapollo"}>
                        <IndexLinks/>
                    </Card>
                </IndexCardContainer>
            </CenteredChildLayout>
        </Background>
    </>
);


export default IndexPage;
