import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import {
    CheckIcon,
    ExternalLinkIcon,
    LinkIcon,
    WarningTwoIcon,
} from '@chakra-ui/icons';

import Link from 'next/link';
import Head from 'next/head';
import { Button, Divider, useColorMode } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { query, createRecord } from 'thin-backend';

const ShorteningUrls: NextPage = () => {
    const { colorMode } = useColorMode();
    const [error, setError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [realURI, setRealURI] = useState('');
    const [shortenedURI, setShortenedURI] = useState('');
    const inputRef = useRef<any>();

    const isValidUrl = (urlString: string) => {
        try {
            if (Boolean(new URL(urlString))) {
                setRealURI(urlString);
            }
        } catch (e) {
            return false;
        }
    };

    const shortenedUrlCall = (
        url: string,
    ): Promise<{ shortenedUrl: string }> => {
        // fetch('/api/shorten-url', {
        //     method: 'POST',
        //     cache: 'force-cache',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //     body: JSON.stringify(url), // body data type must match "Content-
        // }).then((response) => response.json());
        return new Promise((resolve) => {
            query('urls')
                .where({ realuri: url })
                .fetchOne()
                .then((result) => {
                    if (result) {
                        resolve({ shortenedUrl: result.shorturi });
                    } else {
                        const shortURL = nanoid(10);
                        createRecord('urls', {
                            shorturi: shortURL,
                            realuri: url,
                        })
                            .then(() => {
                                resolve({ shortenedUrl: shortURL });
                            })
                            .catch(() => {
                                setError(true);
                            });
                    }
                });
        });
    };

    const shortenUrl = async () => {
        setSaving(true);
        const shortenedUrl = await shortenedUrlCall(realURI);

        if (shortenedUrl!.shortenedUrl) {
            setShortenedURI(
                `${window.location.origin}/url/${shortenedUrl.shortenedUrl}`,
            );
        }
        setSaving(false);
    };

    return (
        <Layout home className={utilStyles.homeSplit}>
            <Head>
                <title>Arthur.Kovacs is shortening urls</title>
            </Head>
            <section className={utilStyles.urlShortenerContainer}>
                <div className={utilStyles.urlShortenerInput}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={'Paste URL to shorten'}
                        onChange={(e) => {
                            setTimeout(() => {
                                isValidUrl(inputRef.current.value);
                            }, 10);
                        }}
                    />

                    {error && (
                        <span style={{ padding: '0 1rem' }}>
                            <WarningTwoIcon w={8} h={8} color="red.500" />
                        </span>
                    )}

                    {!shortenedURI && (
                        <Button
                            leftIcon={<LinkIcon />}
                            colorScheme="teal"
                            variant="link"
                            size="lg"
                            isLoading={saving}
                            disabled={!realURI!.length}
                            onClick={shortenUrl}
                        >
                            Shorten
                        </Button>
                    )}
                    {shortenedURI && <CheckIcon w={8} h={8} color="teal" />}
                </div>
                {shortenedURI && (
                    <Button
                        style={{ paddingTop: '1rem' }}
                        rightIcon={<LinkIcon />}
                        colorScheme="teal"
                        variant="link"
                        size="lg"
                    >
                        <Link href={shortenedURI}>
                            <a>Try the shortened url: {shortenedURI}</a>
                        </Link>
                    </Button>
                )}
                {!shortenedURI && (
                    <Button
                        style={{ paddingTop: '1rem' }}
                        colorScheme="teal"
                        variant="link"
                        size="lg"
                        disabled={true}
                    >
                        Paste a valid url and click the Shorten URL button
                    </Button>
                )}
            </section>
        </Layout>
    );
};

export default ShorteningUrls;
