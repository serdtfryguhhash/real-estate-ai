import React from "react";
import Link from "next/link";
import { Building2, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/shared/newsletter-form";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold leading-tight">DealFinder</span>
                <p className="text-[10px] text-white/60 -mt-0.5">AI-Powered Real Estate</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              AI-powered property analysis for smarter real estate investments. Find, analyze, and close deals with confidence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/deals" className="hover:text-white transition-colors">Deal Finder</Link></li>
              <li><Link href="/map" className="hover:text-white transition-colors">Interactive Map</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">Investment Calculator</Link></li>
              <li><Link href="/alerts" className="hover:text-white transition-colors">Deal Alerts</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio Tracker</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><Link href="/referrals" className="hover:text-white transition-colors">Affiliate Program</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Reports</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Weekly Market Deals</h4>
            <p className="text-sm text-white/70 mb-4">
              Get the top deals and market insights delivered to your inbox every week.
            </p>
            <NewsletterForm variant="dark" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            &copy; 2026 DealFinder AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/80 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
