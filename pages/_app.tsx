import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import AnimatedCanvas from '../components/canvas-bg';
import { ChakraProvider } from '@chakra-ui/provider';
import { extendTheme } from '@chakra-ui/react';
import ColorPaletteGenerator from '../utils/generate-color-scheme';
import { RepeatIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

function MyApp({ Component, pageProps }: AppProps) {
    const [colorPalette, setColorPalette] = useState(
        new ColorPaletteGenerator().setColors(),
    );
    const [theme, setTheme] = useState<any>();

    const breakpoints = {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px',
    };

    useEffect(() => {
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
        setTheme(
            extendTheme(
                {
                    styles: {
                        global: (props: StyleFunctionProps) => ({
                            body: {
                                // fontFamily: 'body',
                                // color: mode('gray.800', 'whiteAlpha.900')(props),
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
                },
                breakpoints, // TODO: These might not be taken
            ),
        );
        // TODO: ^ This might not be necessary.
    }, [colorPalette]);

    return (
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
    );
}

export default MyApp;
