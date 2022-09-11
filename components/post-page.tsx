import { NextPage } from 'next';
import { Article } from './interfaces';
import Layout from './layout';
import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import postStyles from './post-page.module.scss';
import Date from './date';
import { useColorMode } from '@chakra-ui/react';
import sdk from '@stackblitz/sdk';
import { useLayoutEffect } from 'react';
import Script from 'next/script';

const PostPage: NextPage<Article> = ({ title, date, contentHtml }) => {
    const { colorMode } = useColorMode();

    // TODO: Make it a very smart component
    useLayoutEffect(() => {
        let blitzes: { element: HTMLElement; payload: object }[] = [];
        document
            .querySelectorAll("code[class*='language-stackblitz']")
            .forEach((element) => {
                stackBlitzRenderCode(element);
            });
    }, []);

    return (
        <Layout home={false}>
            <Head>
                <title>{title}</title>
            </Head>
            <Script
                src="https://unpkg.com/prettier@2.7.1/standalone.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://unpkg.com/prettier@2.7.1/parser-typescript.js"
                strategy="beforeInteractive"
            />
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

const stackBlitzRenderCode = (element: any) => {
    // console.log(
    //     JSON.stringify({
    //         project: {
    //             files: {
    //                 'index.ts': `function* generator(limit) {for (let i = 0; i < limit; i++) { yield i } } for (let i of generator(10)) { console.log(i) }`,
    //             },
    //         },
    //         options: {
    //             clickToLoad: false,
    //             openFile: 'index.ts',
    //             terminalHeight: 50,
    //         },
    //     }),
    // );
    try {
        const code = JSON.parse(element.textContent as any);
        // console.log('code', code);
        const project = {
            title: 'Node Starter',
            description: 'A basic Node.js project',
            template: 'typescript',
            files: {
                'index.html': '<div id="app"></div>',
                'style.css': `h1, h2 {font-family: Lato;}`,
                'package.json': `{
                  "name": "typescript",
                  "version": "0.0.0",
                  "private": true,
                  "dependencies": {
                    "@types/prettier": "^1.15.2",
                    "prettier": "^1.15.3"
                  }
                }`,
            },
        };
        // @ts-ignore
        project.files['index.ts'] = prettier.format(
            code.project.files['index.ts'],
            {
                parser: 'typescript',
                // @ts-ignore
                plugins: prettierPlugins,
            },
        );

        if (element) {
            sdk.embedProject(
                element,
                // @ts-ignore
                project,
                {
                    showSidebar: false,
                    devToolsHeight: 100,
                    // hideNavigation: true,
                    // hideExplorer: true,
                    height: 360,
                    clickToLoad: false,
                    terminalHeight: 50,
                    ...code.options,
                },
            ).then((r) => {
                console.log('r', r);
            });
        }
    } catch (e) {
        console.log('e', e);
    }
};
