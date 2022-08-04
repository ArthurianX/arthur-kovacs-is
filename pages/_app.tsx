import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AnimatedCanvas from '../components/canvas-bg';
import { ChakraProvider } from '@chakra-ui/provider';
import { extendTheme } from '@chakra-ui/react';
import ColorPaletteGenerator from '../utils/generate-color-scheme';
import { RepeatIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [colorPalette, setColorPalette] = useState(
        new ColorPaletteGenerator().setColors(),
    );
    const [theme, setTheme] = useState<any>();

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
            extendTheme({
                artheme: {
                    900: colorPalette.baseColor,
                    800: colorPalette.complimentaryColor1,
                    700: colorPalette.complimentaryColor2,
                },
            }),
        );
    }, [colorPalette]);

    return (
        <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
            <AnimatedCanvas colors={colorPalette} />
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
