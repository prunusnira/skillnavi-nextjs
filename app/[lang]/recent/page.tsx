import Card from '@/component/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { getRecent } from '@/module/api/recent/getRecent';
import { cn } from '@/module/util/cn';
import { IMG } from '@/data/url';
import SkillColor from '@/component/common/skillColor/SkillColor';

const PageRecent = async () => {
    const t = await getTranslations('recent');
    const recent = await getRecent();

    if (!recent) {
        return null;
    }

    return (
        <Card title={t('recent')}>
            <section className={cn('w-full px-2 py-8')}>
                {recent.map((r) => (
                    <div
                        key={r.name}
                        className={cn(
                            'flex w-full p-2.5 border-b border-solid border-white',
                        )}
                    >
                        {/* 아이콘/이름 */}
                        <div
                            className={cn('flex-grow flex items-center gap-2')}
                        >
                            {r.titletower && (
                                <img
                                    alt="icon"
                                    src={`${IMG}/title/${r.titletower}.png`}
                                    className={cn('w-8 h-8')}
                                />
                            )}
                            <div>{r.opencount ? r.name : '(NO NAME)'}</div>
                        </div>

                        {/* 스킬 정보 */}
                        <div className={cn('flex-col-center w-30')}>
                            <div className={cn('flex-center gap-2')}>
                                <div className={cn('w-8 text-center')}>GF</div>
                                <div className={cn('w-20 text-center')}>
                                    <SkillColor value={Number(r.gskill)} />
                                </div>
                            </div>
                            <div className={cn('flex-center gap-2')}>
                                <div className={cn('w-8 text-center')}>DM</div>
                                <div className={cn('w-20 text-center')}>
                                    <SkillColor value={Number(r.dskill)} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </Card>
    );
};

export default PageRecent;
