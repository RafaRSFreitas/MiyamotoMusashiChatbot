import * as React from "react";
import musashiAvatar from "@/assets/musashi_avatar.png";

const LoadingIndicator = () => {
  return (
    <div className="flex gap-3 mb-4">
      <div className="w-14 h-14 rounded-full bg-secondary border-2 border-border flex items-center justify-center overflow-hidden shrink-0">
        <img 
          src={musashiAvatar}
          alt="Musashi" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-[80%] px-4 py-3 rounded-lg border-2 bg-background border-border">
        <div className="flex gap-1.5 items-center">
          <span className="text-muted-foreground text-sm">Musashi is thinking</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full thinking-dot"></span>
            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full thinking-dot"></span>
            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full thinking-dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;