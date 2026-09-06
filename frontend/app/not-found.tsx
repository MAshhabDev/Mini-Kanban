import React from "react";
import Link from "next/link";
import { Wrench, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-8 text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-300">
        
        {/* 404 Badge Icon */}
        <div className="w-20 h-20 rounded-3xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center mx-auto shadow-inner">
          <span className="font-black text-3xl">404</span>
        </div>

        {/* Heading & Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-destructive bg-destructive/10 px-3 py-1 rounded-full border border-destructive/20">
            <Wrench className="w-3.5 h-3.5" />
            <span>Page Not Found</span>
          </div>
          
          <h1 className="text-2xl font-black text-foreground pt-1">
            Oops! Lost Your Way?
          </h1>
          
          <p className="text-xs text-muted-foreground leading-relaxed">
            The page or service route you are looking for does not exist or might have been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link href="/" className="w-full">
            <Button className="w-full rounded-2xl font-bold text-xs py-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md flex items-center justify-center gap-2 cursor-pointer">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}