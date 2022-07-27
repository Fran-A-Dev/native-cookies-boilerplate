import Head from "next/head";
import React from "react";

import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Headless WP App</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
}
