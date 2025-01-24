import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { ProfileModel } from '@/data/profile/ProfileModel';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const body = await req.json();
            const { token } = body;

            const profile = ProfileModel.findOne({
                where: { unique_id: token },
            });

            return NextResponse.json(profile);
        },
    });
};
