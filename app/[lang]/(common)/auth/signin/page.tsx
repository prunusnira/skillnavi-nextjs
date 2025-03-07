import Card from '@/component/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/module/util/cn';
import LoginForm from '@/component/auth/login/LoginForm';

export const dynamic = 'force-dynamic';

const PageSignIn = async () => {
    const t = await getTranslations('user.login');

    return (
        <article className={cn('w-[90%] h-full flex-col-center')}>
            <Card title={t('title')}>
                <LoginForm />
            </Card>
        </article>
    );
};

export default PageSignIn;
