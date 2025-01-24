import Language from '@/crawler/Language';
import { CrawlerText } from '@/crawler/data/CrawlerText';
import { TextType } from '@/crawler/interface/TextType';

const Warning = () => {
    const lang = Language.setLang();
    const text = CrawlerText;

    return (
        <section className={'flex-col-center'}>
            <div className={'text-2xl font-bold'}>
                {(text.crawler.alert.title as TextType)[lang]}
            </div>
            <div className={'flex flex-col items-start w-full'}>
                <div>{(text.crawler.alert.warn1 as TextType)[lang]}</div>
                <div>{(text.crawler.alert.warn2 as TextType)[lang]}</div>
                <div>{(text.crawler.alert.warn3 as TextType)[lang]}</div>
                <div>{(text.crawler.alert.warn4 as TextType)[lang]}</div>
            </div>
        </section>
    );
};

export default Warning;
