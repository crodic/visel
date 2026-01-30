"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SearchTrigger } from "./search-trigger";
import { SearchDrawer } from "./search-drawer";
import { SearchBox } from "./search-box";

export function ResponsiveSearch() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // On mobile: show search trigger button
  if (isMobile) {
    return (
      <>
        <SearchTrigger onClick={() => setIsDrawerOpen(true)} />
        <SearchDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          onSearch={handleSearch}
        />
      </>
    );
  }

  // On desktop: show inline search box
  return <SearchBox />;
}
