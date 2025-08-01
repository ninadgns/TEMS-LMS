"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, cloneElement, isValidElement } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react"; // Ensure this import is correct
import { Route } from "@/lib/types";

const NavPhone = ({ routes }: { routes: Route[] }) => {
  const pathname = usePathname();

  const isActive = (linkPath: string) => pathname === linkPath;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          {routes.map(({ path, label, Icon }) => (
            <Link
              key={path}
              href={path}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                isActive(path)
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              } hover:text-foreground`}
            >
              {Icon}
              {label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavPhone;
