import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="http://fonts.cdnfonts.com/css/gilroy-bold"
          rel="stylesheet"
        />
        <link href="http://fonts.cdnfonts.com/css/inter" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
