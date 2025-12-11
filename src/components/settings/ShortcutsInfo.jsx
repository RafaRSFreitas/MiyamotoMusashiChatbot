import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const shortcuts = [
  { key: "/", description: "Open chat bar" },
  { key: "Esc", description: "Close chat" },
];

const ShortcutsInfo = () => {
  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-xl">Shortcuts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {shortcuts.map((shortcut, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="font-mono text-sm">Press {shortcut.key}</span>
              <span className="text-muted-foreground">–</span>
              <span className="text-muted-foreground">{shortcut.description}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ShortcutsInfo;
