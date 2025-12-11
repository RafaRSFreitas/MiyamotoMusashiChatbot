import * as React from "react";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import MobileMenu from "@/components/layout/MobileMenu";
import HeroSection from "@/components/home/HeroSection";
import BiographySection from "@/components/home/BiographySection";
import AccessibilitySettings from "@/components/settings/AccessibilitySettings";
import ShortcutsInfo from "@/components/settings/ShortcutsInfo";
import AboutChatbot from "@/components/settings/AboutChatbot";
import ChatWindow from "@/components/chat/ChatWindow";
import ExampleQuestions from "@/components/chat/ExampleQuestions";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [settings, setSettings] = useState({
    textSize: 100,
    darkMode: false,
    dyslexiaFont: false,
  });

  const hasChatStarted = chatMessages.length > 0;

  // Apply settings
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.textSize}%`;
  }, [settings.textSize]);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  useEffect(() => {
    if (settings.dyslexiaFont) {
      document.body.style.fontFamily = "OpenDyslexic, Arial, sans-serif";
    } else {
      document.body.style.fontFamily = "";
    }
  }, [settings.dyslexiaFont]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && currentPage !== "chat") {
        e.preventDefault();
        setCurrentPage("chat");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const handleStartChat = () => {
    setCurrentPage("chat");
  };

  return (
    <div className="min-h-screen parchment-bg">
      <Header
        onMenuClick={() => setIsMobileMenuOpen(true)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        hasChatStarted={hasChatStarted}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        hasChatStarted={hasChatStarted}
      />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {currentPage === "home" && (
          <>
            <HeroSection onStartChat={handleStartChat} />
            <BiographySection />
            

          </>
        )}

        {currentPage === "chat" && (
          <div className="h-[calc(100vh-120px)]">
            <ChatWindow 
              messages={chatMessages} 
              onMessagesChange={setChatMessages} 
            />
          </div>
        )}

        {currentPage === "about" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">About</h1>
            <AboutChatbot />
          </div>
        )}

        {currentPage === "settings" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <AccessibilitySettings settings={settings} onSettingsChange={setSettings} />
            <ShortcutsInfo />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
