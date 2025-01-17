import CrawlerNoToken from '@/crawler/CrawlerNoToken';
import Crawler from '@/crawler/Crawler';

const PageCrawler = async ({
    searchParams,
}: {
    searchParams: { token: string };
}) => {
    const { token } = searchParams;

    if (!token?.length) {
        return <CrawlerNoToken />;
    }

    return <Crawler />;
};

export default PageCrawler;
