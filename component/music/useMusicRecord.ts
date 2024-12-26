import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMusicRecord } from '@/module/api/music/getMusicRecord';
import { usePathname, useRouter } from '@/i18n/routing';
import { getMusicInfo } from '@/module/api/music/getMusicInfo';
import { GameMode } from '@/data/game/GameMode';
import { useMemo, useState } from 'react';
import { Skill } from '@/data/skill/Skill';
import { getMusicPattern } from '@/module/api/music/getMusicPattern';
import { useAtomValue } from 'jotai';
import {
    atomGameVersionLatest,
    atomGameVersionList,
} from '@/jotai/atomGameVersion';
import { GameVersion } from '@/data/game/GameVersion';

const useMusicRecord = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [
        gameMode,
        setGameMode,
    ] = useState<GameMode>('g');

    const [
        ptcodeList,
        setPtcodeList,
    ] = useState<number[]>([]);

    const versionList = useAtomValue(atomGameVersionList);
    const latest = useAtomValue(atomGameVersionLatest);

    const uid = searchParams.get('uid');
    const mid = searchParams.get('mid');
    const version = searchParams.get('version');

    const getMusic = async () => {
        if (!mid) return undefined;
        const info = await getMusicInfo({ mid: Number(mid) });
        const pattern = await getMusicPattern({
            mid: Number(mid),
            version: Number(version),
        });
        return {
            info,
            pattern,
            version,
        };
    };

    const getRecord = () => {
        if (!uid || !mid || !version) {
            return undefined;
        }
        return getMusicRecord({
            mid: Number(mid),
            uid: Number(uid),
            version: Number(version),
        });
    };

    const { data: music } = useQuery({
        queryKey: [
            'music',
            mid,
            version,
        ],
        queryFn: getMusic,
    });

    const { data: skill } = useQuery({
        queryKey: [
            'skill',
            mid,
            uid,
            version,
        ],
        queryFn: getRecord,
    });

    const skillDisplay = useMemo(() => {
        const list: Skill[] = [];
        if (gameMode === 'g') {
            setPtcodeList([
                1,
                2,
                3,
                4,
            ]);
            skill?.forEach((x) => {
                if (x.patterncode < 5) {
                    list.push(x);
                }
            });
        }
        if (gameMode === 'b') {
            setPtcodeList([
                5,
                6,
                7,
                8,
            ]);
            skill?.map((x) => {
                if (x.patterncode >= 5 && x.patterncode < 9) {
                    list.push(x);
                }
            });
        }
        if (gameMode === 'd') {
            setPtcodeList([
                9,
                10,
                11,
                12,
            ]);
            skill?.map((x) => {
                if (x.patterncode >= 9) {
                    list.push(x);
                }
            });
        }
        return list;
    }, [
        gameMode,
        skill,
    ]);

    // 데이터 업데이트
    const changeVersion = (nextver: number) => {
        const nextParams = new URLSearchParams();
        nextParams.set('uid', String(uid));
        nextParams.set('mid', String(mid));
        nextParams.set('version', String(nextver));
        router.push(`${pathname}?${nextParams.toString()}`);
    };

    // 선택 가능한 버전 목록
    const availableVersion = useMemo(() => {
        if (!music || !latest) return [];
        const start = music.info.version >= 24 ? music.info.version : 24;

        const verlist: GameVersion[] = [];
        versionList?.forEach((v) => {
            if (v.id >= start) {
                verlist.push(v);
            }
        });
        return verlist;
    }, [
        music,
        latest,
        versionList,
    ]);

    return {
        gameMode,
        changeGameType: setGameMode,
        changeVersion,
        music,
        skill: skillDisplay,
        ptcodeList,
        availableVersion,
        version,
    };
};

export default useMusicRecord;
