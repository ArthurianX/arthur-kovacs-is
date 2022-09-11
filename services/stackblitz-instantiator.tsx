import sdk from '@stackblitz/sdk';

const stackblitzInstantiator = (element: any) => {
    const code = JSON.parse(element.textContent as any);

    try {
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
                },
            );
        }
    } catch (e) {}
};
