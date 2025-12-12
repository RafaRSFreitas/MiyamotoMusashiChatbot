import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ExampleQuestions from "./ExampleQuestions";
import LoadingIndicator from "./LoadingIndicator";
import { useToast } from "@/hooks/use-toast";

// TODO: Replace with your backend API URL
const CHAT_API_URL = "http://localhost:3000/api/chat";

const ChatWindow = ({ messages, onMessagesChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = useCallback(async (userMessages) => {
    const resp = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed with status ${resp.status}`);
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantContent += content;
            onMessagesChange((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, [onMessagesChange]);

  const sendMessage = useCallback(async (text) => {
    const userMsg = { role: "user", content: text };
    onMessagesChange((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      await streamChat([...messages, userMsg]);
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
  }, [messages, streamChat, toast, onMessagesChange]);

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
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <LoadingIndicator />
        )}
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
