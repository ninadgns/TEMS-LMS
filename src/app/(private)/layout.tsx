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


import Navbar from '@/components/Navbar';
import NavPhone from '@/components/NavPhone';
import { Route } from '@/lib/types';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TEMS Database Management',
};

const routes: Route[] = [
  {
    path: '/exams',
    label: 'Exams',
    Icon: <BookIcon />
  },
  {
    path: '/students',
    label: 'Students',
    Icon: <UsersIcon />
  },
  {
    Icon: <User />,
    label: 'Profile',
    path: '/profile',
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen w-full md:grid-cols-[160px_1fr] lg:grid-cols-[192px_1fr]">
          <div className="fixed hidden border-r bg-muted/40 md:block min-h-screen md:min-w-40 lg:min-w-48">
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
          <div></div>
          <div className="flex flex-col">
            {/* <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <NavPhone routes={routes} />
            </header> */}
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
