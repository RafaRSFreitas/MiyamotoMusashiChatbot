import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutChatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortContent = `This Miyamoto Musashi chatbot is a web-based conversational AI system developed as part of a Software Engineering project at Bournemouth University. The application demonstrates the practical integration of modern web technologies with artificial intelligence to create an engaging and educational historical experience.`;

  const fullContent = `${shortContent}

This interactive chatbot allows users to engage in meaningful conversations with a virtual representation of Miyamoto Musashi, the legendary 16th-century Japanese swordsman, strategist, and author of "The Book of Five Rings." Through natural language processing, users can explore topics ranging from Musashi's famous duels and combat techniques to his philosophical teachings on strategy, discipline, and the way of the warrior. The chatbot responds in character, providing insights into feudal Japan, samurai culture, and Musashi's unique perspective on martial arts and life.

The system is built using a React frontend and Express backend, demonstrating professional software engineering practices throughout its development. The interface features a carefully designed Japanese-inspired aesthetic with parchment texturing and traditional typography that reflects the historical period. User experience was a key priority, with the application including comprehensive accessibility features such as adjustable text sizing, dark mode support, and dyslexia-friendly font options to ensure an inclusive experience for all users.

This project serves as both a technical demonstration of conversational AI implementation and an educational tool for anyone interested in learning about one of history's most influential martial artists and philosophers. Whether you're a history enthusiast, martial arts practitioner, or simply curious about samurai culture, this chatbot offers an engaging way to explore Musashi's legacy and timeless wisdom.`;

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-xl">About this chatbot</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed whitespace-pre-line text-muted-foreground">
          {isExpanded ? fullContent : shortContent}
        </p>
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 h-auto mt-2 text-primary underline"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AboutChatbot;