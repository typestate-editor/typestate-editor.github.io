// From https://github.com/mui-org/material-ui/tree/master/examples/nextjs
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "../src/website/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {/*
            <link
              rel="shortcut icon"
              href="/images/favicon.ico"
              type="image/x-icon"
            />
            <link rel="apple-touch-icon" href="/images/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/images/favicon.ico"
            />
            <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/images/favicon.ico"
            />
          */}
          <script
            type="text/javascript"
            src="/vendor/jsoneditor-minimalist.min.js"
          ></script>
          {/* https://unpkg.com/jsoneditor@9.0.0/dist/jsoneditor-minimalist.min.js */}
          <link
            rel="stylesheet"
            type="text/css"
            href="/vendor/jsoneditor.min.css"
          ></link>
          {/* https://unpkg.com/jsoneditor@9.0.0/dist/jsoneditor.min.css */}
          {/* https://unpkg.com/jsoneditor@9.0.0/dist/img/jsoneditor-icons.svg */}
          <script
            type="text/javascript"
            src="/vendor/vis-network.min.js"
          ></script>
          {/* https://unpkg.com/vis-network@7.7.0/standalone/umd/vis-network.min.js */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
