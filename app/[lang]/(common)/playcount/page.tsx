import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import PlayCountTypePresenter from '@/feature/playcount/component/PlayCountType.presenter';
import { getPlayCount } from '@/feature/playcount/api/getPlayCount';
import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import PlayCountItem from '@/feature/playcount/component/PlayCount.item';

const PagePlaycount = async ({
    searchParams,
}: {
    searchParams: { type: string };
}) => {
    const t = await getTranslations('user.playcount');
    const { type } = searchParams;
    const session = await getServerSession();
    const profile = await getProfileSession(session);
    const playcount = await getPlayCount({ type, id: profile?.id });

    return (
        <Card title={'My Play Count'}>
            {/* 상단 설명부분 */}
            <section>
                <span>{t('desc_1')}</span>
                <span className={'text-red-500 font-bold'}>{t('desc_2')}</span>
                <span>{t('desc_3')}</span>
            </section>

            {/* 타입변경 */}
            <PlayCountTypePresenter />

            {/* 데이터 */}
            <section className={'grid grid-cols-2 md:grid-cols-4 gap-[10px]'}>
                {playcount?.map((item, index) => (
                    <PlayCountItem
                        key={`${type}_${item.id}`}
                        pos={index + 1}
                        item={item}
                        type={type}
                    />
                ))}
            </section>
        </Card>
    );
};

export default PagePlaycount;
