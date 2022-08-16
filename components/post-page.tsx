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
import { createPortal } from 'react-dom';

const PostPage: NextPage<Article> = ({ title, date, contentHtml }) => {
    const { colorMode } = useColorMode();

    console.log(
        JSON.stringify({
            project: {
                title: 'Node Starter',
                description: 'A basic Node.js project',
                template: 'node',
                files: {
                    'index.js': `console.log('Hello World!');`,
                    'package.json': `{
                              "name": "my-project",
                              "scripts": { "hello": "node index.js", "start": "serve node_modules" },
                              "dependencies": { "serve": "^14.0.0" },
                              "stackblitz": { "installDependencies": true, "startCommand": "npm start" },
                            }`,
                },
            },
            options: {
                clickToLoad: true,
                openFile: 'index.js',
                terminalHeight: 50,
            },
        }),
    );

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

const stackBlitzRenderCode = (element) => {
    try {
        const code = JSON.parse(element.textContent as any);
        if (element) {
            sdk.embedProject(
                element,
                {
                    title: 'Node Starter',
                    description: 'A basic Node.js project',
                    template: 'typescript',
                    files: {
                        'index.html': '<div id="app"></div>',
                        'style.css': `h1, h2 {font-family: Lato;}`,
                        'index.ts': `function* generator(limit) {
  for (let i = 0; i < limit; i++) {
    yield i
  }
}

for (let i of generator(10)) {
  console.log(i)
}
`,
                        'package.json': `{
  "name": "typescript",
  "version": "0.0.0",
  "private": true,
  "dependencies": {}
}`,
                    },
                },
                {
                    clickToLoad: false,
                    openFile: 'index.js',
                    terminalHeight: 50,
                    showSidebar: false,
                    devToolsHeight: 100,
                    // hideNavigation: true,
                    hideExplorer: true,
                    height: 360,
                },
            );
        }
    } catch (e) {}
};
