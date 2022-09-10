import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Activity, Article } from '../../components/interfaces';
import PostPage from '../../components/post-page';
import { getRealURl } from '../../lib/urls';
import React, { useEffect, useState } from 'react';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import postStyles from '../../components/post-page.module.scss';
import { ReactBlitz } from '@arthurianx/reactblitz';
import { Skeleton } from '@chakra-ui/react';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const url = await getRealURl(params?.id);

    return {
        props: {
            url,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

const RedirectToUrl: NextPage = () => {
    const [uri, setURI] = useState('');
    useEffect(() => {
        const shortURL = window.location.pathname.split('/')[2] || '';

        query('urls')
            .where({ shorturi: shortURL })
            .fetchOne()
            .then((result) => {
                setURI(result.realuri);
                window.location.replace(result.realuri);
            });
    }, []);

    return (
        <Layout home={false}>
            <Head>
                <title>Redirect</title>
            </Head>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: '1rem',
                    width: '100%',
                }}
            >
                <span style={{ paddingRight: '0.5rem' }}>Redirecting to </span>
                {!uri && <Skeleton height="20px" width="60vw" />}{' '}
                <strong>{uri}</strong>
            </div>
        </Layout>
    );
};

export default RedirectToUrl;
