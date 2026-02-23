import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled}
        className="flex-1 bg-background border-2 border-border text-foreground placeholder:text-muted-foreground"
        aria-label="Chat message input"
      />
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4"
        aria-label="Send message"
      >
        <Check className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default ChatInput;
