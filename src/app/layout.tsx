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
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
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

        {children}
        <Toaster />
      </body>
    </html >
  );
}
