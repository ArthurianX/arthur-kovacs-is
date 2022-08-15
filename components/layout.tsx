import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { NextPage } from 'next';
import ArFooter from './footer';
import { Box, useMediaQuery } from '@chakra-ui/react';
const name = 'Arthur Kovacs is';
export const siteTitle = 'Arthur Kovacs is';
export const footerIconSize = 18;

const Layout: NextPage<any> = ({ children, home }) => {
    const FooterAndReturn = () => {
        return (
            <>
                {!home && (
                    <div className={styles.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}
                <ArFooter />
            </>
        );
    };

    const NextHead = () => {
        return (
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Arthur Kovacs's bio site." />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
        );
    };

    const AvatarWSize = ({ size }: any) => {
        return (
            <Image
                priority
                src="/images/avatar.jpg"
                className={utilStyles.borderCircleMain}
                height={size}
                width={size}
                alt={name}
            />
        );
    };
    return (
        <div
            className={'flex flex-row overflow-hidden'} //px-4
            style={{ width: '100vw', height: '100vh' }}
        >
            <NextHead />
            <header
                className={`flex flex-col ${
                    !home
                        ? 'justify-start items-center pt-10'
                        : 'justify-center items-center'
                }`}
                style={
                    !home
                        ? { maxWidth: '240px', flex: '240px' }
                        : { maxWidth: '340px', flex: '340px' }
                }
            >
                {home ? (
                    <>
                        <AvatarWSize size={144} />
                        <h1 className={utilStyles.headingXl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <AvatarWSize size={108} />
                            </a>
                        </Link>
                        {/*<h2 className={utilStyles.headingLg}>*/}
                        {/*    <Link href="/">*/}
                        {/*        <a className={`${utilStyles.colorInherit}`}>*/}
                        {/*            I think that*/}
                        {/*        </a>*/}
                        {/*    </Link>*/}
                        {/*</h2>*/}
                    </>
                )}
            </header>
            <Box
                className={`h-screen flex flex-grow  ${
                    !home ? 'items-start justify-start' : ''
                }`}
            >
                {children}
            </Box>
            <FooterAndReturn />
        </div>
    );
};

export default Layout;
