import { atom } from 'jotai';
import { CrawlerData } from '@/crawler/interface/CrawlerData';

export const atomCrawlerData = atom<CrawlerData | undefined>(undefined);

export const atomCrawler = atom(
    (get) => get(atomCrawlerData),
    (get, set, params: { type: keyof CrawlerData; value: string | number }) => {
        const prev = get(atomCrawlerData);
        if (!prev) return;

        const next = { ...prev };
        const { type, value } = params;

        if (type in next && typeof next[type] === typeof value) {
            (next[type] satisfies CrawlerData[typeof type]) = value;
        }

        set(atomCrawlerData, next);
    },
);
