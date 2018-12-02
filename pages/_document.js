import Document, { Head, Main, NextScript } from "next/document";
import "uikit/dist/css/uikit.min.css";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <title>essaydb</title>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="collection of college application essays and personal statements"
          />
          {/* uikit */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.25/css/uikit.min.css"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.25/js/uikit.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.25/js/uikit-icons.min.js" />
        </Head>

        <body>
          <Main />
          <NextScript crossOrigin="anonymous" />
        </body>
      </html>
    );
  }
}
