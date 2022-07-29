import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Activity, Article } from '../../components/interfaces';
import PostPage from '../../components/post-page';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params?.id, Activity.Playing);
    return {
        props: {
            ...postData,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds(Activity.Playing);
    return {
        paths,
        fallback: false,
    };
};

const Post: NextPage<Article> = ({ title, date, contentHtml }) => {
    return <PostPage title={title} date={date} contentHtml={contentHtml} />;
};

export default Post;
