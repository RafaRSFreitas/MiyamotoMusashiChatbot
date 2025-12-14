import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ExampleQuestions from "./ExampleQuestions";
import LoadingIndicator from "./LoadingIndicator";
import { useToast } from "@/hooks/use-toast";

const CHAT_API_URL = "http://localhost:4000/api/chat";

const ChatWindow = ({ messages, onMessagesChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(async (text) => {
    // Validate message
    if (!text || typeof text !== 'string' || text.trim() === '') {
      toast({
        title: "Error",
        description: "Message is required and must be a string.",
        variant: "destructive",
      });
      return;
    }

    const userMsg = { role: "user", content: text };
    onMessagesChange((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Start both the API call and the minimum delay timer
      const startTime = Date.now();
      const minDelay = 1500; 

      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.text || data.reply || "I have no words.";
      
      // Calculate remaining time to reach minimum delay
      const elapsedTime = Date.now() - startTime;
      const remainingDelay = Math.max(0, minDelay - elapsedTime);
      
      // Wait for remaining time if needed
      if (remainingDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingDelay));
      }
      
      // Add assistant's response after minimum delay
      const assistantMsg = { 
        role: "assistant", 
        content: replyText
      };
      onMessagesChange((prev) => [...prev, assistantMsg]);

    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, onMessagesChange]);

  return (
    <div className="flex flex-col h-full bg-background border-2 border-border rounded-lg overflow-hidden min-h-[400px]">
      {/* Header */}
      <div className="px-4 py-3 border-b-2 border-border bg-card">
        <h2 className="text-xl font-semibold text-center">Miyamoto Musashi Chatbot</h2>
        <p className="text-sm text-muted-foreground text-center">Musashi (Online)</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="mb-4">Greetings. I am Miyamoto Musashi.</p>
            <p className="text-sm">Ask me about the way of the sword, my duels, or life in feudal Japan.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.content} isUser={msg.role === "user"} />
        ))}
        {isLoading && <LoadingIndicator />}
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 border-t-2 border-border bg-card space-y-3">
        <ChatInput onSend={sendMessage} disabled={isLoading} />
        <ExampleQuestions onSelect={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;