"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Clipboard, Download, Code } from "lucide-react";
import { useToast } from "./hooks/use-toast";
import { ScrollArea } from "./ui/scroll_area";

interface RScriptDisplayProps {
  script: string | null;
}

export function RScriptDisplay({ script }: RScriptDisplayProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    if (script) {
      navigator.clipboard.writeText(script);
      toast({
        title: "R Script Copied!",
        description: "The script has been copied to your clipboard.",
      });
    }
  };

  const handleDownload = () => {
    if (script) {
      const blob = new Blob([script], { type: "text/r;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "analysis_script.R");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderContent = () => {
    if (script === null) {
      return (
        <div className="space-y-2 p-4">
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
        </div>
      );
    }
    return (
      <ScrollArea className="h-62.5 w-full">
        <pre className="p-4 font-code text-sm">
          <code>{script}</code>
        </pre>
      </ScrollArea>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="font-space-grotesk flex items-center gap-2">
              <Code className="h-5 w-5" /> Generated R Script
            </CardTitle>
            <CardDescription>
              AI-suggested script for in-depth analysis.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              disabled={!script}
              aria-label="Copy script"
            >
              <Clipboard className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownload}
              disabled={!script}
              aria-label="Download script"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-b-lg border-t bg-secondary/30">
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  );
}
