import React from "react";
import Document, {Html, Head, Main, NextScript} from 'next/document'
import analyticsHead from "../constants/analytics/analyticsHead.html";
import analyticsBody from "../constants/analytics/analyticsBody.html";
import parse from 'html-react-parser';
import baseUrl from "../utils/data/baseUrl";
// import {addEruda} from "../constants/DOM/eruda";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps}
  }

  render() {
    return (
      <Html id={"html-point"} lang={"ru"}>
        <Head>
          <meta name="build-date" content={process.env.NEXT_PUBLIC_BUILD_DATE}/>
          <meta charSet="utf-8"/>
          <meta name="theme-color" content="#ffffff"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
          <meta name="format-detection" content="telephone=no"/>
          <link href={baseUrl(`fonts/fonts.css`)} rel="stylesheet"/>
          <link rel="icon" href={baseUrl(`favicon.ico`)}/>
          {parse(analyticsHead)}
          {/*{parse(addEruda())}*/}
        </Head>
        <body className={"_preloader"}>
        {parse(analyticsBody)}
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default CustomDocument;
