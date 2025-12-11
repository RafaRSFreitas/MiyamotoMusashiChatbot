import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const MobileMenu = ({ isOpen, onClose, currentPage, onNavigate, hasChatStarted }) => {
  const navItems = ["Home", "Chat", "Settings", "About"];

  const getPageKey = (item) => item.toLowerCase();

  const handleNavigate = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="bg-card border-r-2 border-border">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-4">
          {navItems.map((item) => {
            const pageKey = getPageKey(item);
            return (
              <button
                key={item}
                onClick={() => handleNavigate(pageKey)}
                className={`text-left text-lg py-2 px-4 rounded-lg transition-colors ${
                  currentPage === pageKey
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
