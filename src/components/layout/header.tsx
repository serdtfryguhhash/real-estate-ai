"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Building2,
  Menu,
  X,
  LayoutDashboard,
  Search,
  Map,
  Calculator,
  Bell,
  Briefcase,
  BookOpen,
  Settings,
  Gift,
  LogIn,
  User,

} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/deals", label: "Deals", icon: Search },
  { href: "/map", label: "Map", icon: Map },
  { href: "/calculator", label: "Calculator", icon: Calculator },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
];

const secondaryNav = [
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLanding = pathname === "/";
  const isAuth = pathname === "/login" || pathname === "/signup";

  // Simulate logged-in state for demo purposes on non-landing pages
  const isLoggedIn = !isLanding && !isAuth;

  return (
    <header className={cn(
      "sticky top-0 z-50 border-b transition-colors",
      isLanding ? "bg-white/80 backdrop-blur-md border-transparent" : "bg-white border-border"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary leading-tight">DealFinder</span>
              <span className="text-[10px] text-muted-foreground leading-tight -mt-0.5">AI-Powered Real Estate</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {isLoggedIn && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            {!isLoggedIn && secondaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/blog" className="hidden lg:flex">
                  <Button variant="ghost" size="sm">
                    <BookOpen className="h-4 w-4 mr-1.5" />
                    Blog
                  </Button>
                </Link>
                <Link href="/settings">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4 mr-1.5" />
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started Free</Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {isLoggedIn && navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border pt-2 mt-2 space-y-1">
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md">
                Pricing
              </Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md">
                Blog
              </Link>
              {isLoggedIn && (
                <>
                  <Link href="/referrals" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md">
                    <Gift className="h-4 w-4" />
                    Referrals
                  </Link>
                  <Link href="/settings" onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
