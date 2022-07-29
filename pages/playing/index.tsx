import type { GetStaticProps, NextPage } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import { Activity, Article } from '../../components/interfaces';
import ActivityPage from '../../components/activity-page';

export const getStaticProps: GetStaticProps = async () => {
    const cookingPostsData = getSortedPostsData(Activity.Playing);

    return {
        props: {
            playing: cookingPostsData,
        },
    };
};

const Playing: NextPage<{
    playing: Article[];
}> = ({ playing }) => {
    return <ActivityPage articles={playing} activityName={Activity.Playing} />;
};

export default Playing;
