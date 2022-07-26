import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Activity, Article } from '../../components/interfaces';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params?.id, Activity.Cooking);
    return {
        props: {
            ...postData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds(Activity.Cooking);
    return {
        paths,
        fallback: false,
    };
};

const Post: NextPage<Article> = ({ title, date, contentHtml }) => {
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

export default Post;
