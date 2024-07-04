import Link from 'next/link';
import {
    Bell,
    BuildingIcon,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    LocateIcon,
    ShoppingCart,
    TreesIcon,
    Truck,
    TruckIcon,
    UserIcon,
    BadgeAlert,
    Users,
    HardHat,
    FileText,
    UsersIcon,
    BellIcon,
    HomeIcon,
    BookIcon,
    User,
} from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TEMS Database Management',
};

import Navbar from '@/components/Navbar';
import NavPhone from '@/components/NavPhone';
import { Route } from '@/lib/types';
import ProfileMenu from '@/components/ProfileMenu';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const routes: Route[] = [
    {
        path: '/exams',
        label: 'Exams',
        Icon: <BookIcon />
    }
];

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    // const { data, error } = await supabase.auth.getUser();
    // if (error || !data?.user) {
    // 	redirect('/login');
    // }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">TEMS LMS</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <Navbar routes={routes} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <NavPhone routes={routes} />
                    <ProfileMenu />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
