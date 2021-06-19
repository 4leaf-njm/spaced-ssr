import App, { Container } from "next/app";
import React from "react";
import { ToastContainer } from "react-nextjs-toast";
import { CookiesProvider } from "react-cookie";
import GlobalStyles from "../src/Styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import Theme from "../src/Styles/Theme";
import Axios from "axios";
import "antd/dist/antd.css";

class ReactApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={Theme}>
          <CookiesProvider>
            <GlobalStyles />
            <ToastContainer
              align={"center"}
              position={"bottom"}
              id={"toast-container"}
            />
            <Component {...pageProps} />
          </CookiesProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

ReactApp.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const cookie = ctx.isServer ? ctx.req.headers.cookie : "";

  if (ctx.isServer && cookie) {
    Axios.defaults.headers.Cookie = cookie;
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default ReactApp;
