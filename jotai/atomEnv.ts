import { atom } from 'jotai';
import { AtomEnv } from '@/data/env/AtomEnv';
import { Language } from '@/data/env/Language';
import { Theme } from '@/data/env/Theme';

export const atomEnvData = atom<AtomEnv>({
    theme: 'light',
    language: Language.en,
    transparency: false,
    menu: false,
    currentVersion: undefined,
});

export const atomEnv = atom(
    (get) => get(atomEnvData),
    (
        get,
        set,
        params: {
            type: keyof AtomEnv;
            data: keyof typeof Language | Theme | boolean | number | undefined;
        },
    ) => {
        const prev = get(atomEnvData);
        const next = { ...prev };
        const { type, data } = params;

        if (type in next && typeof next[type] === typeof data) {
            (next[type] satisfies AtomEnv[typeof type]) = data;
        }

        set(atomEnvData, next);
    },
);
