import { cn } from '@/module/util/cn';

const Title = () => {
    return (
        <section className={cn('w-full flex-col-center px-5 py-10')}>
            {/* 이유는 알 수 없으나, justify-end가 justify-content: flex-end를 만들지 못하고 있음 */}
            <div
                className={cn('w-full flex items-center justify-end')}
                style={{ justifyContent: 'flex-end' }}
            >
                <button
                    className={cn(
                        'px-5 py-2.5 rounded-xl border border-solid border-white text-sm',
                    )}
                >
                    CLOSE
                </button>
            </div>
            <div className={cn('w-full text-xl font-bold')}>
                Skill Navigator
            </div>
            <div className={cn('w-full text-2xl font-semibold')}>
                Data Updater
            </div>
        </section>
    );
};

export default Title;
