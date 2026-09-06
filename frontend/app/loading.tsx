import React from "react";
import { Wrench } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="bg-card border border-border rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-lg animate-in fade-in zoom-in-95 duration-300">
        
        {/* Animated Loading Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto shadow-inner">
          <Wrench className="w-8 h-8 animate-spin" />
        </div>

        {/* Loading Text */}
        <div className="space-y-1">
          <h3 className="font-extrabold text-base text-foreground">
            FixItNow Loading...
          </h3>
          <p className="text-xs text-muted-foreground">
            Please wait a moment while we fetch the latest data.
          </p>
        </div>

        {/* Pulsing Progress Bar */}
        <div className="w-full bg-accent h-1.5 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-2/3 rounded-full animate-pulse" />
        </div>

      </div>
    </div>
  );
}