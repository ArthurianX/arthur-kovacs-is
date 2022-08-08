import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { NextPage } from 'next';
import ToggleLights from './toggle-light';
const name = 'Arthur Kovacs is';
export const siteTitle = 'Arthur Kovacs is';
export const footerIconSize = 18;

const Layout: NextPage<any> = ({ children, home }) => {
    return (
        <div className={styles.container}>
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
            <main className={`${styles.main} ${!home ? styles.mainInner : ''}`}>
                {children}
            </main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
            <footer className={styles.footer}>
                <span>Made with</span>
                <Image
                    src="/heart.svg"
                    height={footerIconSize}
                    width={footerIconSize}
                    alt={'LOVE'}
                />
                <span>,</span>
                <Image
                    src="/nextjs.svg"
                    height={footerIconSize}
                    width={footerIconSize}
                    alt={'NEXTJS'}
                />
                <span>and</span>
                <Image
                    src="/vercel.svg"
                    height={footerIconSize}
                    width={footerIconSize}
                    alt={'VERCEL'}
                />
                <div className={styles.footerDivider}></div>
                <span>Source on</span>
                <a
                    rel={'noreferrer'}
                    target={'_blank'}
                    href="https://github.com/ArthurianX/arthur-kovacs-is"
                >
                    <Image
                        src="/github.svg"
                        height={footerIconSize}
                        width={footerIconSize}
                        alt={'GITHUB'}
                    />
                </a>
                <div className={styles.footerDivider}></div>
                <ToggleLights />
            </footer>
        </div>
    );
};

export default Layout;
