import type { GetStaticProps, NextPage } from 'next';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

import Link from 'next/link';
import Date from '../components/date';
import Head from 'next/head';
import { Activity, Article } from '../components/interfaces';
import { useColorMode } from '@chakra-ui/react';

export const getStaticProps: GetStaticProps = async () => {
    const cookingPostsData = getSortedPostsData(Activity.Cooking);
    const playingPostsData = getSortedPostsData(Activity.Playing);
    const readingPostsData = getSortedPostsData(Activity.Reading);
    const workingPostsData = getSortedPostsData(Activity.Working);

    return {
        props: {
            working: workingPostsData.shift(),
            playing: playingPostsData.shift(),
            cooking: cookingPostsData.shift(),
            reading: readingPostsData.shift(),
        },
    };
};

const Home: NextPage<{
    working: Article;
    playing: Article;
    cooking: Article;
    reading: Article;
}> = ({ cooking, playing, reading, working }) => {
    const { colorMode } = useColorMode();



    return (
        <Layout home className={utilStyles.homeSplit}>
            <Head>
                <title>Arthur.Kovacs is ...</title>
            </Head>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.activitiesContainer}`}
            >
                <div
                    className={`${utilStyles.listItem} ${utilStyles.heading2Xl} ${utilStyles.activitiesMain}`}
                >
                    <Link href={`/working`}>
                        <a>Working</a>
                    </Link>
                </div>
                <div
                    className={`${utilStyles.listItem} ${utilStyles.heading2Xl} ${utilStyles.activitiesMain}`}
                >
                    <Link href={`/playing`}>
                        <a>Playing</a>
                    </Link>
                </div>
                <div
                    className={`${utilStyles.listItem} ${utilStyles.heading2Xl} ${utilStyles.activitiesMain}`}
                >
                    <Link href={`/cooking`}>
                        <a>Cooking</a>
                    </Link>
                </div>
                <div
                    className={`${utilStyles.listItem} ${utilStyles.heading2Xl} ${utilStyles.activitiesMain}`}
                >
                    <Link href={`/reading`}>
                        <a>Reading</a>
                    </Link>
                </div>
            </section>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${
                    utilStyles.postsContainer
                } ${
                    colorMode === 'light'
                        ? utilStyles.postsContainerLight
                        : utilStyles.postsContainerDark
                }`}
            >
                {working ? (
                    <div className={utilStyles.listItem} key={working.id}>
                        <Link href={`/working/${working.id}`}>
                            <a>{working.title}</a>
                        </Link>
                        <small className={utilStyles.lightText}>
                            <Date dateString={working.date!} /> - Working
                        </small>
                    </div>
                ) : (
                    <></>
                )}
                {playing ? (
                    <div className={utilStyles.listItem} key={playing.id}>
                        <Link href={`/playing/${playing.id}`}>
                            <a>{playing.title}</a>
                        </Link>
                        <small className={utilStyles.lightText}>
                            <Date dateString={playing.date!} /> - Playing
                        </small>
                    </div>
                ) : (
                    ''
                )}
                {cooking ? (
                    <div className={utilStyles.listItem} key={cooking.id}>
                        <Link href={`/cooking/${cooking.id}`}>
                            <a>{cooking.title}</a>
                        </Link>
                        <small className={utilStyles.lightText}>
                            <Date dateString={cooking.date!} /> - Cooking
                        </small>
                    </div>
                ) : (
                    ''
                )}
                {reading ? (
                    <div className={utilStyles.listItem} key={reading.id}>
                        <Link href={`/reading/${reading.id}`}>
                            <a>{reading.title}</a>
                        </Link>
                        <small className={utilStyles.lightText}>
                            <Date dateString={reading.date!} /> - Reading
                        </small>
                    </div>
                ) : (
                    ''
                )}
            </section>
        </Layout>
    );
};

export default Home;
