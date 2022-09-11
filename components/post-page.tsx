import { NextPage } from 'next';
import { Article } from './interfaces';
import Layout from './layout';
import Head from 'next/head';
import Date from './date';
import { useColorMode } from '@chakra-ui/react';
import sdk from '@stackblitz/sdk';
import { useLayoutEffect } from 'react';
import Script from 'next/script';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import utilStyles from '../styles/utils.module.css';
import postStyles from './post-page.module.scss';

const PostPage: NextPage<Article> = ({ title, date, contentHtml }) => {
    const { colorMode } = useColorMode();

    useLayoutEffect(() => {
        // Render all the StackBlitzes
        document
            .querySelectorAll("code[class*='language-stackblitz']")
            .forEach((element) => {
                stackBlitzRenderCode(element);
            });

        // Render all the code blocks
        document.querySelectorAll('pre code').forEach((el: any) => {
            hljs.highlightElement(el);
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
    try {
        const code = JSON.parse(element.textContent as any);
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
            //TODO: Replace this with ReactBlitz
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
