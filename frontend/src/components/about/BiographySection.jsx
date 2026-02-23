import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BiographySection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortBio = `Miyamoto Musashi (1584-1645) was a legendary Japanese swordsman, philosopher, strategist, writer, and artist. He is renowned as one of Japan's greatest sword masters and founder of the Niten Ichi-ryū school of swordsmanship.`;

  const fullBio = `${shortBio}

Born in Harima Province, Musashi fought his first duel at age 13. He went on to fight over 60 duels, never losing a single one. His most famous duel was against Sasaki Kojiro at Ganryū Island in 1612, where he defeated his opponent using a wooden sword carved from an oar.

After years of wandering as a ronin (masterless samurai), Musashi dedicated himself to perfecting not just his martial skills but also the arts of painting, calligraphy, and sculpture. He believed that mastery of one discipline could lead to mastery of all.

In his final years, he retired to a cave called Reigandō and wrote his masterwork, "The Book of Five Rings" (Go Rin no Sho), a treatise on strategy, tactics, and philosophy that remains influential to this day. He also wrote "Dokkōdō" (The Path of Aloneness), a list of 21 precepts for self-discipline.

Musashi died in 1645, leaving behind a legacy that continues to inspire martial artists, strategists, and philosophers worldwide.`;

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-xl">Biography</CardTitle>
        <p className="text-lg font-semibold text-muted-foreground">Miyamoto Musashi</p>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed whitespace-pre-line">
          {isExpanded ? fullBio : shortBio}
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

export default BiographySection;
