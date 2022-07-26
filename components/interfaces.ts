export interface Article {
    id?: string;
    title?: string;
    date?: string;
    contentHtml?: string;
    content?: string;
    // TODO: Improve this once it becomes clear what an article should have
}

export enum Activity {
    Working = 'Working',
    Playing = 'Playing',
    Cooking = 'Cooking',
    Reading = 'Reading',
}
