import type { GetStaticProps, NextPage } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import { Activity, Article } from '../../components/interfaces';
import ActivityPage from '../../components/activity-page';

export const getStaticProps: GetStaticProps = async () => {
    const workingPostsData = getSortedPostsData(Activity.Working);

    return {
        props: {
            working: workingPostsData,
        },
    };
};

const Working: NextPage<{
    working: Article[];
}> = ({ working }) => {
    return <ActivityPage articles={working} activityName={Activity.Working} />;
};

export default Working;
