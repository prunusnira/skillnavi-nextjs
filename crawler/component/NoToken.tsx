import Language from '@/crawler/Language';
import { CrawlerText } from '@/crawler/data/CrawlerText';
import Title from '@/crawler/component/Title';
import { cn } from '@/module/util/cn';

const NoToken = () => {
    const lang = Language.setLang();
    return (
        <section className={cn('bg-black text-white w-full max-w-screen-lg')}>
            <Title />
            <section className={cn('p-2.5')}>
                {CrawlerText.notoken[lang]}
            </section>
        </section>
    );
};

export default NoToken;
