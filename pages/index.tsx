import type { GetStaticProps, NextPage } from 'next';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

import Link from 'next/link';
import Date from '../components/date';
import Head from 'next/head';
import { Activity, Article } from '../components/interfaces';

export const getStaticProps: GetStaticProps = async () => {
    const cookingPostsData = getSortedPostsData(Activity.Cooking);
    // const playingPostsData = getSortedPostsData(Activity.Playing);
    // const readingPostsData = getSortedPostsData(Activity.Reading);
    // const workingPostsData = getSortedPostsData(Activity.Working);

    return {
        props: {
            cooking: cookingPostsData.shift(),
            // playing: playingPostsData.shift(),
            // reading: readingPostsData.shift(),
            // working: workingPostsData.shift(),
        },
    };
};

const Home: NextPage<{
    cooking: Article;
    // playing: Article;
    // reading: Article;
    // working: Article;
}> = ({ cooking /*playing, reading, working*/ }) => {
    return (
        <Layout home>
            <Head>
                <title>Arthur.Kovacs is ...</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hello, I'm <strong>Arthur</strong>, I'm passionate about
                    writing apps in Next.js
                </p>
                <p></p>
            </section>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {/* Make a nice animated thingie here */}
                    <li className={utilStyles.listItem} key={cooking.id}>
                        <Link href={`/cooking/${cooking.id}`}>
                            <a>{cooking.title}</a>
                        </Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={cooking.date!} />
                        </small>
                    </li>
                </ul>
            </section>
        </Layout>
    );
};

export default Home;
