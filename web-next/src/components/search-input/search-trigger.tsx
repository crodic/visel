"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label="Open search"
      className="text-foreground hover:bg-accent/10 hover:text-accent h-10 w-10 rounded-lg transition-all active:scale-95"
    >
      <Search className="h-5 w-5" />
    </Button>
  );
}
