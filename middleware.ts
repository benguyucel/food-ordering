import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import { withAuth } from "next-auth/middleware"

const onylAdminCanReach = [
    '/admin',
    '/api/admin',
]
const isAdminRoute = (pathname: string) => {
    return onylAdminCanReach.some(route => pathname.startsWith(route))
}

export default withAuth(
    async function middleware(req: NextRequest) {

        const token: any = await getToken({ req })
        const { pathname } = req.nextUrl;
        //if token does not exist retun home
        if (!token) return NextResponse.redirect(new URL('/', `${process.env.NEXT_API_BASE_URL}`))
        //Only admin can reach
        if (isAdminRoute(pathname) && !['admin'].includes(token.role)) {
            return NextResponse.redirect(new URL('/', `${process.env.NEXT_API_BASE_URL}`))
        }
        if (pathname.startsWith('/api/users')) {
             if (userId !== "register") {
            let userId = pathname.split('/')[3]
                if (typeof userId === "undefined" && !['admin'].includes(token.role)) {
                    return NextResponse.redirect(new URL('/', `${process.env.NEXT_API_BASE_URL}`))
                }
                if (userId !== token.uid || !['admin', 'user'].includes(token.role)) {
                    return NextResponse.redirect(new URL('/', `${process.env.NEXT_API_BASE_URL}`))
                }
            }
             }
        }
    
)
export const config = {
    matcher: ['/api/users/:path*', '/api/admin/:path*', '/admin/:path*']
};
