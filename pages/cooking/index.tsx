import type { GetStaticProps, NextPage } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import { Activity, Article } from '../../components/interfaces';
import ActivityPage from '../../components/activity-page';

export const getStaticProps: GetStaticProps = async () => {
    const cookingPostsData = getSortedPostsData(Activity.Cooking);

    return {
        props: {
            cooking: cookingPostsData,
        },
    };
};

const Cooking: NextPage<{
    cooking: Article[];
}> = ({ cooking }) => {
    return <ActivityPage articles={cooking} activityName={Activity.Cooking} />;
};

export default Cooking;
