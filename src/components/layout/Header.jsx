import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = ({ onMenuClick, currentPage, onNavigate, hasChatStarted }) => {
  const navItems = ["Home", "Chat", "Settings", "About"];

  const getPageKey = (item) => {
    if (item === "Chat") return "chat";
    return item.toLowerCase();
  };

  return (
    <header className="border-b-2 border-border bg-card">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile header */}
        <div className="flex items-center justify-between md:hidden">
          <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold">Samurai Chatbot</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Desktop header */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {navItems.map((item) => {
            const pageKey = getPageKey(item);
            return (
              <button
                key={item}
                onClick={() => onNavigate(pageKey)}
                className={`text-lg hover:text-primary transition-colors ${
                  currentPage === pageKey ? "text-primary underline underline-offset-4" : "text-foreground"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
