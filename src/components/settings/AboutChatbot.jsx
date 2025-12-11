import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutChatbot = () => {
  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-xl">About this chatbot</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Content coming soon...
        </p>
      </CardContent>
    </Card>
  );
};

export default AboutChatbot;
