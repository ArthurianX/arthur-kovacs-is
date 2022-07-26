import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

import { getSortedPostsData } from '../../lib/posts';

import Link from 'next/link';
import Date from '../../components/date';
import Head from 'next/head';
import { Activity, Article } from '../../components/interfaces';

export const getStaticProps: GetStaticProps = async () => {
    const cookingPostsData = getSortedPostsData(Activity.Cooking);

    return {
        props: {
            cooking: cookingPostsData,
        },
    };
};

const Cooking: NextPage<{
    cooking: Article[];
}> = ({ cooking }) => {
    return (
        <Layout home={false}>
            <Head>
                <title>Arthur.Kovacs is Cooking</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hello, I'm <strong>Arthur</strong>, I'm passionate about
                    cooking
                </p>
                <p></p>
            </section>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {cooking.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date!} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
};

export default Cooking;
