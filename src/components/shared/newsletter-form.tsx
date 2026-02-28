"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "inline" | "dark" }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  if (variant === "dark") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
          required
        />
        <Button type="submit" variant="accent" className="whitespace-nowrap" disabled={subscribed}>
          {subscribed ? (
            <><Check className="h-4 w-4 mr-2" /> Subscribed!</>
          ) : (
            <><Mail className="h-4 w-4 mr-2" /> Subscribe</>
          )}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="email"
        placeholder="Enter your email for weekly deals"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      <Button type="submit" disabled={subscribed}>
        {subscribed ? (
          <><Check className="h-4 w-4 mr-2" /> Subscribed!</>
        ) : (
          <><Mail className="h-4 w-4 mr-2" /> Get Weekly Deals</>
        )}
      </Button>
    </form>
  );
}
