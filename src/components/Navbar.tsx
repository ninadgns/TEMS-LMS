"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Route } from "@/lib/types";
export const Navbar = ({ routes }: { routes: Route[] }) => {
  const pathname = usePathname();

  // Function to determine if the link is active
  const isActive = (linkPath: string) => pathname === linkPath;

  return (
    <nav className="grid items-start px-2 text-base font-medium lg:px-4">
      {routes.map(({ path, label, Icon }) => (
        <Link
          key={path}
          href={path}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive(path) ? "text-primary bg-muted" : "text-muted-foreground"
          } hover:text-primary`}
        >
          {Icon}
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
