import * as React from "react";
import { cn } from "@/lib/utils";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={cn("flex gap-3 mb-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-secondary border-2 border-border flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-lg border-2",
          isUser
            ? "bg-card border-border text-foreground"
            : "bg-background border-border text-foreground"
        )}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">{message}</p>
      </div>
      
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-secondary border-2 border-border flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
