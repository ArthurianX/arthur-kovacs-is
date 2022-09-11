import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getRealURl } from '../../lib/urls';
import React, { useEffect, useState } from 'react';
import { query } from 'thin-backend';
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
