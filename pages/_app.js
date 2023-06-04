import {ChakraProvider} from '@chakra-ui/react';
import Head from 'next/head';
import {DevSupport} from "@react-buddy/ide-toolbox-next";

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider>
            <Head>
                <title>Recipes App</title>
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;