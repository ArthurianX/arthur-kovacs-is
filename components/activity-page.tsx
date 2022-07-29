import { NextPage } from 'next';
import { Activity, Article } from './interfaces';
import Layout from './layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from './date';

const ActivityPage: NextPage<{
    articles: Article[];
    activityName: Activity;
}> = (props) => {
    return (
        <Layout home={false}>
            <Head>
                <title>
                    Arthur.Kovacs is {props.activityName.toUpperCase()}
                </title>
            </Head>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <ul className={utilStyles.list}>
                    {props.articles.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link
                                href={`/${props.activityName.toLowerCase()}/${id}`}
                            >
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

export default ActivityPage;
