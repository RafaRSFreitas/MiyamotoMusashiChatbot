import * as React from "react";
import { Button } from "@/components/ui/button";
import musashiBackground from "@/assets/musashi_background.png";

const HeroSection = ({ onStartChat }) => {
  return (
    <div className="mb-6">
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
        
        {/* Content container with title and button */}
        <div className="relative z-10 flex flex-col justify-between items-center min-h-[300px] py-8 px-4">
          {/* Title at the top */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
            Miyamoto Musashi Chatbot
          </h1>
          
          {/* Button at the bottom */}
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