import { NextPage } from 'next';
import { Article } from './interfaces';
import Layout from './layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import postStyles from './post-page.module.scss';
import Date from './date';
import { useColorMode } from '@chakra-ui/react';

const PostPage: NextPage<Article> = ({ title, date, contentHtml }) => {
    const { colorMode } = useColorMode();
    return (
        <Layout home={false}>
            <Head>
                <title>{title}</title>
            </Head>
            <article
                className={`${postStyles.articleContainer} ${
                    colorMode === 'light'
                        ? postStyles.articleLight
                        : postStyles.articleDark
                }`}
            >
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={date!} />
                </div>
                <div
                    className={`markdown-body ${postStyles.article}`}
                    dangerouslySetInnerHTML={{ __html: contentHtml! }}
                />
            </article>
        </Layout>
    );
};

export default PostPage;
