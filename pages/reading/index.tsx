import type { GetStaticProps, NextPage } from 'next';
import { getSortedPostsData } from '../../lib/posts';
import { Activity, Article } from '../../components/interfaces';
import ActivityPage from '../../components/activity-page';

export const getStaticProps: GetStaticProps = async () => {
    const readingPostsData = getSortedPostsData(Activity.Reading);

    return {
        props: {
            reading: readingPostsData,
        },
    };
};

const Reading: NextPage<{
    reading: Article[];
}> = ({ reading }) => {
    return <ActivityPage articles={reading} activityName={Activity.Reading} />;
};

export default Reading;
