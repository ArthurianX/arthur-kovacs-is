import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { NextPage } from 'next';
import ToggleLights from './toggle-light';
import ArFooter from './footer';
import { Box, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
const name = 'Arthur Kovacs is';
export const siteTitle = 'Arthur Kovacs is';
export const footerIconSize = 18;

const Layout: NextPage<any> = ({ children, home }) => {
    const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
    return (
        <div
            className={`${styles.container} ${
                isLargerThan1024 ? styles.containerRow : styles.containerCol
            }`}
        >
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header
                className={`${styles.header} ${
                    !home ? styles.innerHeader : ''
                }`}
            >
                {home ? (
                    <>
                        <Image
                            priority
                            src="/images/avatar.jpg"
                            className={utilStyles.borderCircleMain}
                            height={144}
                            width={144}
                            alt={name}
                        />
                        <h1 className={utilStyles.headingXl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/images/avatar.jpg"
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>
                                    I think that
                                </a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            {/* sm: '30em', md: '48em', lg: '62em', xl: '80em', '2xl': '96em',*/}
            <Box
                width={[
                    '100%', // 0-30em
                    '100%', // 30em-48em
                    '100%', // 48em-62em
                    '100%', // 48em-62em
                    '80%', // 62em+
                ]}
                className={`${styles.main} ${!home ? styles.mainInner : ''}`}
            >
                {children}
            </Box>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
            <ArFooter />
        </div>
    );
};

export default Layout;
