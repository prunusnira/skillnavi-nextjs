'use client';

import { cn } from '@/module/util/cn';
import Card from '@/component/common/card/Card';
import SkillColor from '@/component/common/skillColor/SkillColor';
import SkillMenu from '@/component/skill/menu/SkillMenu';
import SkillTableTitleVersion from '@/component/skill/table/SkillTableTitleVersion';
import { TableType } from '@/data/skill/TableType';
import useSkillTable from '@/component/skill/table/useSkillTable';
import { TableDataType } from '@/data/skill/TableDataType';
import SkillList from '@/component/skill/table/SkillList';
import SkillGrid from '@/component/skill/table/SkillGrid';
import Pager from '@/component/common/pager/Pager';
import SkillTableTextProfile from '@/component/skill/table/SkillTableTextProfile';

const SkillTable = ({
    searchParams,
}: {
    searchParams: {
        page: number;
        game: string;
        version: number;
        order: string;
        pageType: TableDataType;
        display: TableType;
    };
}) => {
    const { page, game, version, display, pageType } = searchParams;
    const { userSkill, skillSum, profile, skill, isLoading, pages } =
        useSkillTable();

    if (isLoading) {
        return <>Loading</>;
    }

    if (pageType !== 'exc' && !profile) {
        return <>No user data</>;
    }

    return (
        <Card title="Skill">
            {/* 메뉴버튼 영역 */}
            <SkillMenu />

            {/* 타이틀 */}
            <section className={cn('text-2xl font-bold')}>
                {/* 버전 */}
                <SkillTableTitleVersion versionId={version} />

                {/* 게임 / 유저 */}
                <section className={cn('flex-center')}>
                    <div>
                        {game === 'gf' && 'GuitarFreaks'}
                        {game === 'dm' && 'DrumMania'}
                    </div>
                    <div>&nbsp;by&nbsp;</div>
                    {pageType === 'exc' && <div>EXCELLENT MASTER</div>}
                    {pageType !== 'exc' && profile && (
                        <SkillTableTextProfile profile={profile} />
                    )}
                </section>
            </section>

            {/* 스킬 */}
            <section
                className={cn(
                    'flex-col-center w-full max-w-[600px] bg-black my-5 rounded-2xl',
                )}
            >
                <section className={cn('flex justify-around w-full py-2.5')}>
                    <div className={cn('flex-col-center')}>
                        <div>ALL</div>
                        <SkillColor
                            value={userSkill?.all || 0}
                            multiplier={1 / 2}
                        />
                    </div>
                    <div className={cn('flex-col-center')}>
                        <div>GF</div>
                        <SkillColor value={userSkill?.gf || 0} />
                    </div>
                    <div className={cn('flex-col-center')}>
                        <div>DM</div>
                        <SkillColor value={userSkill?.dm || 0} />
                    </div>
                </section>

                {pageType === 'target' && (
                    <section
                        className={cn('flex justify-around w-full py-2.5')}
                    >
                        <div className={cn('flex-col-center')}>
                            <div>SKILL</div>
                            <SkillColor
                                value={
                                    skillSum.reduce(
                                        (acc, cur) => acc + cur,
                                        0,
                                    ) / 100
                                }
                            />
                        </div>
                        <div className={cn('flex-col-center')}>
                            <div>HOT</div>
                            <SkillColor
                                value={skillSum[0] / 100}
                                multiplier={2}
                            />
                        </div>
                        <div className={cn('flex-col-center')}>
                            <div>OTHER</div>
                            <SkillColor
                                value={skillSum[1] / 100}
                                multiplier={2}
                            />
                        </div>
                    </section>
                )}
            </section>

            {/* 테이블 */}
            {display === 'list' &&
                skill?.map((table, tidx) => (
                    <section
                        key={`list_${tidx}`}
                        className={cn('w-full max-w-screen-lg')}
                    >
                        {table.map((skill, index) => (
                            <SkillList
                                key={skill.mid}
                                skill={skill}
                                index={index}
                            />
                        ))}
                    </section>
                ))}

            {/* 그리드 */}
            {display === 'grid' &&
                skill?.map((table, tidx) => (
                    <section
                        key={`grid_${tidx}`}
                        className={cn(
                            'w-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 max-w-screen-lg',
                        )}
                    >
                        {table.map((skill, index) => (
                            <SkillGrid
                                key={skill.mid}
                                skill={skill}
                                index={index}
                            />
                        ))}
                    </section>
                ))}

            {/* pager */}
            {pageType === 'all' && !!pages && pages > 0 && (
                <Pager
                    page={page}
                    allpage={pages}
                />
            )}
        </Card>
    );
};

export default SkillTable;
