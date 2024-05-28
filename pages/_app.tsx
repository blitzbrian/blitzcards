import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="application-name" content="blitzcards" />
                <meta
                    name="description"
                    content="The best way to learn words and short sentences. Boost your memory and master new languages effortlessly!"
                />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:url"
                    content="https://blitzcards.vercel.app/"
                />
                <meta name="twitter:title" content="blitzcards" />
                <meta
                    name="twitter:description"
                    content="The best way to learn words and short sentences. Boost your memory and master new languages effortlessly!"
                />
                <meta
                    name="twitter:image"
                    content="https://blitzcards.vercel.app/image.png"
                />
                <meta name="twitter:creator" content="@blitzbrian" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="blitzcards" />
                <meta
                    property="og:description"
                    content="The best way to learn words and short sentences. Boost your memory and master new languages effortlessly!"
                />
                <meta property="og:site_name" content="blitzcards" />
                <meta
                    property="og:url"
                    content="https://blitzcards.vercel.app/"
                />
                <meta
                    property="og:image"
                    content="https://blitzcards.vercel.app/image.png"
                />
                <meta httpEquiv="content-language" content="en" />
                <title>blitzcards</title>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}