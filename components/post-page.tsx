import { NextPage } from 'next';
import { Article } from './interfaces';
import Layout from './layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import Date from './date';

const PostPage: NextPage<Article> = ({ title, date, contentHtml }) => {
    return (
        <Layout home={false}>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={date!} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: contentHtml! }} />
            </article>
        </Layout>
    );
};

export default PostPage;
