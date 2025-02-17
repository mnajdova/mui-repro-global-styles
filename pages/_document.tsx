import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import { cache } from "./_app";

const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  const styles = extractCritical(initialProps.html);

  return {
    ...initialProps,
    styles: [
      <style
        key="emotion-style-tag"
        data-emotion={`css ${styles.ids.join(" ")}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles.css }}
      />,
      ...React.Children.toArray(initialProps.styles),
    ],
  };
};
