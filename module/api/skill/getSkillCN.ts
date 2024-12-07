export const getSkillCN = (value: number) => {
    if (value < 1000) return 'skill-0';
    if (value < 1500) return 'skill-1000';
    if (value < 2000) return 'skill-1500';
    if (value < 2500) return 'skill-2000';
    if (value < 3000) return 'skill-2500';
    if (value < 3500) return 'skill-3000';
    if (value < 4000) return 'skill-3500';
    if (value < 4500) return 'skill-4000';
    if (value < 5000) return 'skill-4500';
    if (value < 5500) return 'skill-5000';
    if (value < 6000) return 'skill-5500';
    if (value < 6500) return 'skill-6000';
    if (value < 7000) return 'skill-6500';
    if (value < 7500) return 'skill-7000';
    if (value < 8000) return 'skill-7500';
    if (value < 8500) return 'skill-8000';
    if (value < 9000) return 'skill-8500';
    if (value < 9500) return 'skill-9000';
    if (value < 10000) return 'skill-9500';
};
