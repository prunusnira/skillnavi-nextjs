export interface CrawlerData {
    token: string;
    targetVersion: number;
    dataType: 'ALL' | 'TARGET' | 'QUICK';
    delay: number;
}
