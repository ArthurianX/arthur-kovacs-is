import { NextPage } from 'next';
import { Article } from './interfaces';
import Layout from './layout';
import Head from 'next/head';
import Date from './date';
import { useColorMode } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import utilStyles from '../styles/utils.module.css';
import postStyles from './post-page.module.scss';
import { ReactBlitzToElement } from '@arthurianx/reactblitz';
import { RBlitzOptions } from '@arthurianx/reactblitz/dist/cjs/util.types';

const PostPage: NextPage<Article> = ({ title, date, contentHtml }) => {
    const { colorMode } = useColorMode();
    const [blitzes, setBlitzes] = useState<any[]>([]);

    useEffect(() => {
        // Render all the code blocks
        document.querySelectorAll('pre code').forEach((el: any) => {
            hljs.highlightElement(el);
        });
    }, []);

    useLayoutEffect(() => {
        document
            .querySelectorAll("code[class*='language-stackblitz']")
            .forEach((entry) => {
                entry.setAttribute('style', 'display: none');
                setBlitzes([...blitzes, entry]);
            });
    }, []);

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
            {blitzes.map(renderCode)}
        </Layout>
    );
};

export default PostPage;

const renderCode = (element: any) => {
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

    //@ts-ignore
    project.files['index.ts'] = code.project.files['index.ts'];
    const options = {
        showSidebar: false,
        devToolsHeight: 100,
        // hideNavigation: true,
        // hideExplorer: true,
        height: 360,
        clickToLoad: false,
        terminalHeight: 50,
        ...code.options,
        //accentColor: 'var(--complimentary1)',
        //loadingColor: 'var(--complimentary2)',
        //accentBorder: true,
    } as RBlitzOptions;

    return (
        <ReactBlitzToElement
            element={element.parentElement}
            //@ts-ignore
            project={project}
            options={options}
        />
    );
};
