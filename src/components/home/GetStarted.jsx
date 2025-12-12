import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GetStarted = ({ onNavigate }) => {
  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-xl">Your Journey Awaits</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed text-muted-foreground">
          Welcome to the Miyamoto Musashi Chatbot, an interactive AI-powered experience that brings the legendary 16th-century Japanese swordsman and philosopher to life. Engage in meaningful conversations with Musashi himself! Ask about his famous duels, learn the principles from "The Book of Five Rings," explore samurai culture, or seek wisdom on strategy and discipline. Simply click{" "}
          <button 
            onClick={() => onNavigate("chat")}
            className="text-primary underline hover:text-primary/80 cursor-pointer"
          >
            Start Chat
          </button>{" "}
          above to begin your journey into feudal Japan. If you'd like to learn more about Miyamoto Musashi's life and legacy, visit the{" "}
          <button 
            onClick={() => onNavigate("about")}
            className="text-primary underline hover:text-primary/80 cursor-pointer"
          >
            About
          </button>{" "}
          page.
        </p>
      </CardContent>
    </Card>
  );
};

export default GetStarted;