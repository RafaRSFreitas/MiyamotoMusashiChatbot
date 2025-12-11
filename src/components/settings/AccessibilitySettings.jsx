import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const AccessibilitySettings = ({ settings, onSettingsChange }) => {
  const decreaseTextSize = () => {
    const newSize = Math.max(80, settings.textSize - 10);
    onSettingsChange({ ...settings, textSize: newSize });
  };

  const increaseTextSize = () => {
    const newSize = Math.min(150, settings.textSize + 10);
    onSettingsChange({ ...settings, textSize: newSize });
  };

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-xl">Accessibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Size */}
        <div className="space-y-2">
          <Label htmlFor="text-size" className="text-base">
            Text Size
          </Label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decreaseTextSize}
              disabled={settings.textSize <= 80}
              aria-label="Decrease text size"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Slider
              id="text-size"
              value={[settings.textSize]}
              onValueChange={([value]) => onSettingsChange({ ...settings, textSize: value })}
              min={80}
              max={150}
              step={10}
              className="flex-1"
              aria-label="Adjust text size"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={increaseTextSize}
              disabled={settings.textSize >= 150}
              aria-label="Increase text size"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{settings.textSize}%</p>
        </div>

        {/* Dark Mode / High Contrast */}
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="text-base">
            Dark Mode / High Contrast
          </Label>
          <Switch
            id="dark-mode"
            checked={settings.darkMode}
            onCheckedChange={(checked) => onSettingsChange({ ...settings, darkMode: checked })}
            aria-label="Toggle dark mode"
          />
        </div>

        {/* Dyslexia-Friendly Font */}
        <div className="flex items-center justify-between">
          <Label htmlFor="dyslexia-font" className="text-base">
            Dyslexia-Friendly Font
          </Label>
          <Switch
            id="dyslexia-font"
            checked={settings.dyslexiaFont}
            onCheckedChange={(checked) => onSettingsChange({ ...settings, dyslexiaFont: checked })}
            aria-label="Toggle dyslexia-friendly font"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;
