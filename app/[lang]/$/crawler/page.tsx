import NoToken from '@/crawler/component/NoToken';
import { cn } from '@/module/util/cn';
import Title from '@/crawler/component/Title';
import Version from '@/crawler/component/Version';
import { getGameVersions } from '@/module/api/env/getGameVersions';
import Warning from '@/crawler/component/Warning';
import { getUserFromToken } from '@/module/api/auth/getUserFromToken';
import UserBox from '@/component/profile/UserBox';
import Status from '@/crawler/component/Status';

const PageCrawler = async ({
    searchParams,
}: {
    searchParams: { token: string };
}) => {
    const { token } = searchParams;
    const user = await getUserFromToken(token);
    const versionList = await getGameVersions();
    const available: number[] = [];
    versionList.forEach((v) => {
        if (v.ableToUpdate === 1) {
            available.push(v.id);
        }
    });

    console.log(user);

    if (!token?.length || !user) {
        return <NoToken />;
    }

    return (
        <section className={cn('bg-black text-white w-full max-w-screen-lg')}>
            <Title />
            <Version
                versionList={versionList}
                availableVersion={available}
            />
            <UserBox mydata={user} />
            <Warning />
            <Status />
        </section>
    );
};

export default PageCrawler;
