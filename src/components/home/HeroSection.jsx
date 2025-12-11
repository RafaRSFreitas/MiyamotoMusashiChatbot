import * as React from "react";
import { Button } from "@/components/ui/button";
import musashiBackground from "@/assets/musashi_background.png";

const HeroSection = ({ onStartChat }) => {
  return (
    <div className="mb-6">
      {/* Title above the card */}
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
        Miyamoto Musashi Chatbot
      </h1>
      
      {/* Card with background image */}
      <section 
        className="relative overflow-hidden rounded-lg border-2 border-border bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${musashiBackground})` }}
      >
        {/* Overlay for better readability */}
        <div 
          className="absolute inset-0 bg-black/10"
          aria-hidden="true"
        />
        
        {/* Button at the bottom */}
        <div className="relative z-10 flex justify-center py-12 px-4">
          <Button
            onClick={onStartChat}
            size="default"
            className="bg-primary/60 text-primary-foreground hover:bg-primary active:bg-primary px-6 py-2 shadow-lg transition-colors"
          >
            Start Chat
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
