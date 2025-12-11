import * as React from "react";
import { Button } from "@/components/ui/button";

const EXAMPLE_QUESTIONS = [
  "Tell me about your duels",
  "Give me a samurai lesson",
  "What was life like in your time?",
];

const ExampleQuestions = ({ onSelect, disabled }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {EXAMPLE_QUESTIONS.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="text-sm border-2 border-border bg-background hover:bg-accent text-foreground"
        >
          {question}
        </Button>
      ))}
    </div>
  );
};

export default ExampleQuestions;
