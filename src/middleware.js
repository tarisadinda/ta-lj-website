import { NextResponse } from 'next/server';

export function middleware(request) {
    if(!request.cookies.get("access_token")) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/admin/:path*', '/candidate/:path*', '/company/:path*'],
}