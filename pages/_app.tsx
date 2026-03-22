import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AnimatedCanvas from '../components/canvas-bg';
import { ChakraProvider } from '@chakra-ui/provider';
import { extendTheme } from '@chakra-ui/react';
import ColorPaletteGenerator from '../utils/generate-color-scheme';
import { RepeatIcon } from '@chakra-ui/icons';
import { useEffect, useMemo, useState } from 'react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import { initThinBackend } from 'thin-backend';
import { ThinBackend } from 'thin-backend-react';

const thinBackendHost = process.env.NEXT_PUBLIC_BACKEND_URL;
if (thinBackendHost) {
    initThinBackend({ host: thinBackendHost });
}

function MyApp({ Component, pageProps }: AppProps) {
    const [colorPalette, setColorPalette] = useState(
        new ColorPaletteGenerator().setColors(),
    );

    const theme = useMemo(
        () =>
            extendTheme({
                styles: {
                    global: (props: StyleFunctionProps) => ({
                        body: {
                            bg: mode('white', 'blackAlpha.700')(props),
                            lineHeight: 'base',
                        },
                    }),
                },
                brand: {
                    900: colorPalette.baseColor,
                    800: colorPalette.complimentaryColor1,
                    700: colorPalette.complimentaryColor2,
                },
            }),
        [colorPalette],
    );

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log(
                '%c BaseColor ',
                `background: ${colorPalette.baseColor}; color: #fff`,
            );
            console.log(
                '%c ComplimentaryColor1 ',
                `background: ${colorPalette.complimentaryColor1}; color: #fff`,
            );
            console.log(
                '%c ComplimentaryColor2 ',
                `background: ${colorPalette.complimentaryColor2}; color: #fff`,
            );
        }
    }, [colorPalette]);

    return (
        <ThinBackend>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
                <AnimatedCanvas colors={colorPalette} />
                <div className={'animatedBackground'}></div>
                <div className={'animatedBackground'}></div>
                <canvas className={'orbCanvas'}></canvas>
                <div className={'randomColorButton'}>
                    <RepeatIcon
                        onClick={() => {
                            setColorPalette(
                                new ColorPaletteGenerator().setColors(),
                            );
                        }}
                    />
                </div>
            </ChakraProvider>
        </ThinBackend>
    );
}

export default MyApp;
