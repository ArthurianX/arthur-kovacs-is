import Layout from '../../components/layout';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { query } from 'thin-backend';
import { Skeleton } from '@chakra-ui/react';

const RedirectToUrl: NextPage = () => {
    const router = useRouter();
    const [uri, setURI] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const shortURL = router.query.id;
        if (typeof shortURL !== 'string' || !shortURL.length) {
            setErrorMessage('This short link is missing its id.');
            return;
        }

        query('urls')
            .where({ shorturi: shortURL })
            .fetchOne()
            .then((result) => {
                if (!result?.realuri) {
                    setErrorMessage('This short link does not exist anymore.');
                    return;
                }

                setURI(result.realuri);
                window.location.replace(result.realuri);
            })
            .catch(() => {
                setErrorMessage(
                    'The short link lookup failed. Please try again in a moment.',
                );
            });
    }, [router.isReady, router.query.id]);

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
                {!errorMessage && (
                    <>
                        <span style={{ paddingRight: '0.5rem' }}>
                            Redirecting to
                        </span>
                        {!uri && <Skeleton height="20px" width="60vw" />}{' '}
                        <strong>{uri}</strong>
                    </>
                )}
                {errorMessage && <strong>{errorMessage}</strong>}
            </div>
        </Layout>
    );
};

export default RedirectToUrl;
