import Document, { Head, Main, NextScript } from 'next/document';
import { existsGaId, GA_ID } from '../src/lib/gtag';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang='ja'>
        <Head>
          <style>{`body { margin: 0 } /* custom!*/`}</style>
          {/* Google Analytics */}
          {existsGaId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}
        </Head>
        <body className='custom_class w-full p-2 container mx-auto bg-black'>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
