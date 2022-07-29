import '../styles/globals.css';
import type { AppProps } from 'next/app';
import styles from '../components/layout.module.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <canvas className={'orbCanvas'}></canvas>
        </>
    );
}

export default MyApp;
