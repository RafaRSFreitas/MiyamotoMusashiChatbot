import * as React from "react";
import { cn } from "@/lib/utils";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={cn("flex gap-3 mb-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-14 h-14 rounded-full bg-secondary border-2 border-border flex items-center justify-center overflow-hidden shrink-0">
          <img 
            src="src/assets/musashi_avatar.png"
            alt="Musashi" 
            className="w-full h-full object-cover"
          />
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
        <div className="w-14 h-14 rounded-full bg-secondary border-2 border-border flex items-center justify-center overflow-hidden shrink-0">
          <img 
            src="src/assets/seito.png"
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;