import Language from '@/crawler/Language';
import { CrawlerText } from '@/crawler/text';
import Title from '@/crawler/component/Title';
import { cn } from '@/module/util/cn';

const CrawlerNoToken = () => {
    const lang = Language.setLang();
    return (
        <section className={cn('bg-black text-white')}>
            <Title />
            <section>{CrawlerText.notoken[lang]}</section>
        </section>
    );
};

export default CrawlerNoToken;
