import * as React from "react";
import Link from "next/link";

const IndexPage = () => (
    <>
        <h1>Welcome</h1>
        <ul>
            <li><Link href={"/standalone"}><a>Standalone</a></Link></li>
        </ul>
    </>
);

export default IndexPage;
