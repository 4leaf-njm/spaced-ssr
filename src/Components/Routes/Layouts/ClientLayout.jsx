import React from "react";
import Head from "next/head";
import { withApollo } from "../../../../lib/apollo";
import Header from "./Header";
import Footer from "./Footer";

const ClientLayout = ({ children, title }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      {children}

      <Footer />
    </React.Fragment>
  );
};

export default withApollo(ClientLayout);
