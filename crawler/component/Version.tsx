'use client';

import ButtonRounded from '@/component/common/button/ButtonRounded';
import { useAtom } from 'jotai';
import { atomCrawler } from '@/crawler/jotai/atomCrawler';
import { GameVersion } from '@/data/game/GameVersion';

interface Props {
    versionList: GameVersion[];
    availableVersion: number[];
}

const Version = ({ versionList, availableVersion }: Props) => {
    const [
        env,
        setEnv,
    ] = useAtom(atomCrawler);

    return (
        <section className={'w-full flex-col-center'}>
            <div>Version</div>
            <div>
                {availableVersion.map((v) => {
                    const version = versionList?.find((ve) => ve.id === v);
                    if (version) {
                        return (
                            <ButtonRounded
                                key={`version${version.id}`}
                                text={version.short}
                                onClick={() => {
                                    setEnv({
                                        type: 'targetVersion',
                                        value: version.id,
                                    });
                                }}
                                isSelected={env?.targetVersion === version.id}
                            />
                        );
                    }
                })}
            </div>
        </section>
    );
};

export default Version;
