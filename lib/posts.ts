import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Activity, Article } from '../components/interfaces';

const postsDirectory = path.join(process.cwd(), 'posts');
const cookingDirectory = path.join(process.cwd(), 'posts/cooking');
const playingDirectory = path.join(process.cwd(), 'posts/playing');
const readingDirectory = path.join(process.cwd(), 'posts/reading');
const workingDirectory = path.join(process.cwd(), 'posts/working');

export function getSortedPostsData(activity: Activity) {
    let selectedDirectory: string;
    switch (activity) {
        case Activity.Cooking:
            selectedDirectory = cookingDirectory;
            break;
        case Activity.Playing:
            selectedDirectory = playingDirectory;
            break;
        case Activity.Working:
            selectedDirectory = workingDirectory;
            break;
        case Activity.Reading:
            selectedDirectory = readingDirectory;
            break;
        default:
            selectedDirectory = readingDirectory;
    }

    // Get file names under /posts
    const fileNames = fs.readdirSync(selectedDirectory);
    const allPostsData: Article[] = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(selectedDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        };
    });
    // Sort posts by date
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a! < b!) {
            return 1;
        } else if (a! > b!) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllPostIds(activity: Activity) {
    let selectedDirectory: string;
    switch (activity) {
        case Activity.Cooking:
            selectedDirectory = cookingDirectory;
            break;
        case Activity.Playing:
            selectedDirectory = playingDirectory;
            break;
        case Activity.Working:
            selectedDirectory = workingDirectory;
            break;
        case Activity.Reading:
            selectedDirectory = readingDirectory;
            break;
        default:
            selectedDirectory = readingDirectory;
    }
    const fileNames = fs.readdirSync(selectedDirectory);

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(
    id: string | string[] | undefined,
    activity: Activity,
) {
    let selectedDirectory: string;
    switch (activity) {
        case Activity.Cooking:
            selectedDirectory = cookingDirectory;
            break;
        case Activity.Playing:
            selectedDirectory = playingDirectory;
            break;
        case Activity.Working:
            selectedDirectory = workingDirectory;
            break;
        case Activity.Reading:
            selectedDirectory = readingDirectory;
            break;
        default:
            selectedDirectory = readingDirectory;
    }
    const fullPath = path.join(selectedDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
