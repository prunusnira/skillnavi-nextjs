'use client';

import Language from '@/crawler/Language';
import { CrawlerText } from '@/crawler/data/CrawlerText';
import { TextType } from '@/crawler/interface/TextType';
import { useAtom } from 'jotai';
import { atomCrawler } from '@/crawler/jotai/atomCrawler';

const Status = () => {
    const [
        env,
        setEnv,
    ] = useAtom(atomCrawler);

    const lang = Language.setLang();
    const text = CrawlerText;

    if (!env) {
        return null;
    }

    return (
        <section className={'flex-col-center w-full'}>
            <div className={'flex flex-col'}>
                <div className={'text-2xl font-bold'}>
                    {(text.crawler.current as TextType)[lang]}
                </div>
                <div>여기에 현재 갱신중인 곡명 표시</div>
            </div>
            <div className={'flex flex-col'}>
                <div className={'text-2xl font-bold'}>
                    {(text.crawler.pause as TextType)[lang]}
                </div>
                <div className={'flex'}>
                    <input
                        type="range"
                        id="delaySlider"
                        value={env.delay}
                        min="10"
                        max="2000"
                        onChange={(evt) =>
                            setEnv({
                                type: 'delay',
                                value: Number(evt.currentTarget.value),
                            })
                        }
                        style={{ width: '90%', fontWeight: 'bold' }}
                    />
                    <input
                        type={'number'}
                        value={env.delay}
                    />{' '}
                    ms
                </div>
            </div>
        </section>
    );
};

export default Status;
