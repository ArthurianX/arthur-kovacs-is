import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../utils/theme';
import Script from 'next/script';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head />
                <Script
                    src="https://unpkg.com/prettier@2.7.1/standalone.js"
                    strategy="beforeInteractive"
                />
                <Script
                    src="https://unpkg.com/prettier@2.7.1/parser-typescript.js"
                    strategy="beforeInteractive"
                />
                <body>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
