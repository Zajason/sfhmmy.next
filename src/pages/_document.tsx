import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon configuration */}
          <link rel="icon" href="/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#0056b3" />
          <meta name="msapplication-TileColor" content="#0056b3" />
          <meta name="theme-color" content="#ffffff" />
          
          {/* Meta tags - Note: title is set in _app.tsx */}
          <meta name="description" content="ΣΦΗΜΜΥ16 - 16ο Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών" />
          <meta property="og:title" content="ΣΦΗΜΜΥ16" />
          <meta property="og:description" content="16ο Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών" />
          <meta property="og:url" content="https://sfhmmy.gr" />
          <meta property="og:image" content="https://sfhmmy.gr/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ΣΦΗΜΜΥ16" />
          <meta name="twitter:description" content="16ο Συνέδριο Φοιτητών Ηλεκτρολόγων Μηχανικών και Μηχανικών Υπολογιστών" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;