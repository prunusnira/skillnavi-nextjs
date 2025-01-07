'use client';

import { cn } from '@/module/util/cn';
import { Skill } from '@/data/skill/Skill';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { LINK } from '@/data/url';
import { getPatternTypeFromCode } from '@/module/util/pattern/getPatternTypeFromCode';

interface Props {
    skill?: Skill;
    level: number;
    patterncode: number;
    mid: string | null;
    version: string | null;
}

interface DataProps {
    title: string;
    content: string;
}

const ColumnData = ({ title, content }: DataProps) => {
    return (
        <div className={cn('flex-center')}>
            <div className={cn('text-center w-full')}>{title}</div>
            <div className={cn('text-center w-full text-xl font-bold')}>
                {content}
            </div>
        </div>
    );
};

// CSR 개별 기록 정보
const MusicRecordItem = ({
    skill,
    level,
    patterncode,
    mid,
    version,
}: Props) => {
    const t = useTranslations('music.record');
    const difficulty = getPatternTypeFromCode(patterncode);
    const router = useRouter();

    return (
        <section className={cn('flex-col-center px-2.5 py-5')}>
            {/* 패턴 정보 */}
            <div className={cn('flex space-between items-center w-full')}>
                <div className={cn('w-full font-bold text-xl')}>
                    {difficulty} {(level / 100).toFixed(2)}
                </div>
                <div
                    className={cn('link no-line-wrap')}
                    onClick={() =>
                        router.push(
                            LINK.PATTERN.rank(
                                String(version),
                                1,
                                String(mid),
                                patterncode,
                            ),
                        )
                    }
                >
                    {t('link')}
                </div>
            </div>

            {/* 데이터 */}
            <div
                className={cn(
                    'w-full grid grid-cols-1 md:grid-cols-2 items-center gap-5 p-2.5',
                )}
            >
                {/* 데이터 없음 */}
                {!skill && (
                    <div className={cn('text-center')}>{t('norecord')}</div>
                )}

                {skill && (
                    <>
                        {/* 달성률 */}
                        <ColumnData
                            title={t('rate')}
                            content={`${(skill.rate / 100).toFixed(2)}%`}
                        />

                        {/* 랭크 */}
                        <ColumnData
                            title={t('rank')}
                            content={skill.maxrank}
                        />

                        {/* 스킬 */}
                        <ColumnData
                            title={t('skill')}
                            content={(
                                Math.floor((level * skill.rate * 2) / 1000) /
                                100
                            ).toFixed(2)}
                        />

                        {/* 콤보 */}
                        <ColumnData
                            title={t('combo')}
                            content={String(skill.combo)}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default MusicRecordItem;
