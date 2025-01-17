'use client';

import { useEffect } from 'react';
import { getServerTime } from '@/app/[lang]/(common)/getServerTime';

const Test = () => {
    useEffect(() => {
        const run = async () => {
            const time = await getServerTime();
            console.log('servertime', time);
        };
        run();
        console.log('localtime', Date.now());
    }, []);

    return null;
};

export default Test;
