import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AnimatedCanvas from '../components/canvas-bg';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <AnimatedCanvas />
            <canvas className={'orbCanvas'}></canvas>
        </>
    );
}

export default MyApp;
