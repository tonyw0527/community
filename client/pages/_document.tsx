import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Join the community" />
          {/* <meta property="og:url" content="http://" /> */}
          <meta property="og:title" content="community" />
          <meta property="og:description" content="=Join the community" />
          <meta
            property="og:image"
            // content="https://community.ga/thumbnail.gif"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
