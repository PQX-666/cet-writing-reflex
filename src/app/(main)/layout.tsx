"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  GraduationCap,
  BookOpen,
  Clock,
  BookMarked,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "首页", icon: LayoutDashboard },
  { href: "/questions", label: "真题库", icon: Library },
  { href: "/training/reaction", label: "反应训练", icon: GraduationCap },
  { href: "/knowledge", label: "知识库", icon: BookOpen },
  { href: "/cards", label: "背诵卡片", icon: BookMarked },
  { href: "/writing", label: "限时写作", icon: Clock },
  { href: "/review", label: "错题本", icon: BookMarked },
  { href: "/plan", label: "复习计划", icon: Calendar },
  { href: "/settings", label: "设置", icon: Settings },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              isActive
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon size={18} className="shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-white shrink-0 transition-all duration-200",
          collapsed ? "w-16" : "w-56"
        )}
      >
        <div className="flex h-14 items-center border-b px-3">
          {!collapsed && (
            <Link href="/" className="text-sm font-bold text-indigo-600 truncate">
              CET-6 Trainer
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <NavLinks />
        </div>
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 h-12 bg-white border-b flex items-center px-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-56 p-0">
            <div className="flex h-12 items-center border-b px-4">
              <Link href="/" className="text-sm font-bold text-indigo-600" onClick={() => setMobileOpen(false)}>
                CET-6 Trainer
              </Link>
            </div>
            <div className="p-2">
              <NavLinks onClick={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="text-sm font-bold text-indigo-600 ml-2">
          CET-6 Trainer
        </Link>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto mt-12 md:mt-0">
        <div className="mx-auto max-w-7xl p-3 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
