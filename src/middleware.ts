import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from './utils/supabase/server';

export async function middleware(request: NextRequest) {
    const client = createClient();
    const { data: { user: userSession } } = await client.auth.getUser();
    console.log('Middleware run');

    // if (userSession === null) {
    if (request.nextUrl.pathname === "/") {
        const examUrl = request.nextUrl.clone();
        examUrl.pathname = `/exams`;
        return NextResponse.redirect(examUrl);``
    }
    return;
    // }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}