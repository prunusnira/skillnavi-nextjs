import { getTranslations } from 'next-intl/server';
import Card from '@/common/card/Card';
import { cn } from '@/lib/cn';
import MusicRecord from '@/feature/music/component/record/MusicRecord';
import { getProfile } from '@/feature/profile/api/getProfile';
import { IMG } from '@/url/url';
import MusicData from '@/feature/music/component/data/MusicData';
import Image from 'next/image';

const PageMusic = async ({
    searchParams,
}: {
    searchParams: {
        mid: number;
        uid: number;
    };
}) => {
    const t = await getTranslations('music.detail');
    const { mid, uid } = searchParams;

    const user = await getProfile([uid]);

    if (!user.length) {
        // TODO: 사용자를 찾지 못함 알림
    }

    const profile = user[0];

    return (
        <Card title={t('title')}>
            <section className={cn('flex-col-center w-full max-w-3xl py-5')}>
                {/* 플레이어 정보 */}
                <section className={cn('flex-center w-full gap-2.5 py-2.5')}>
                    <div>Player</div>
                    {profile.titletower && (
                        <Image
                            unoptimized={true}
                            alt={'towericon'}
                            src={`${IMG}/title/${profile.titletower}.png`}
                            width={48}
                            height={48}
                        />
                    )}
                    <div>{profile.name}</div>
                </section>

                {/* 음악 데이터 */}
                <MusicData mid={mid} />

                {/* 기록 정보 */}
                <MusicRecord />
            </section>
        </Card>
    );
};

export default PageMusic;
