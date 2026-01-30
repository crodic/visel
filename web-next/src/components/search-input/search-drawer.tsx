/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Clock, Zap, Search as SearchIcon } from "lucide-react";
import { useSearchHistory } from "@/store/search-history";

interface SearchDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (query: string) => void;
}

interface SearchResult {
  suggestions: string[];
  categories: string[];
  products: { id: string; name: string; price: number; image: string }[];
}

export function SearchDrawer({
  open,
  onOpenChange,
  onSearch,
}: SearchDrawerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { history, removeFromHistory, clearHistory, addToHistory } =
    useSearchHistory();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult>({
    suggestions: [],
    categories: [],
    products: [],
  });
  const recentHistory = history.slice(0, 8);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Handle search input with debounce
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!query) {
      setResults({ suggestions: [], categories: [], products: [] });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  const handleSelectHistory = (item: (typeof history)[0]) => {
    setQuery(item.query);
    inputRef.current?.focus();
    // History item is filled in input, user can press Enter to search or modify further
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
    // Suggestion is filled in input, user can press Enter to search or modify further
  };

  const handleSelectProduct = (productName: string) => {
    setQuery(productName);
    inputRef.current?.focus();
    // Product name is filled in input, user can press Enter to search or modify further
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    inputRef.current?.focus();
    // Tag is filled in input, user can press Enter to search or modify further
  };

  const handlePerformSearch = (searchQuery: string) => {
    addToHistory(searchQuery);
    onSearch(searchQuery);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background border-border flex h-[90vh] flex-col border-t">
        {/* Header */}
        <DrawerHeader className="border-border/50 flex items-center justify-between border-b px-4 pt-4 pb-4">
          <h2 className="text-foreground text-lg font-semibold">Search</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted h-8 w-8 rounded-lg"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </Button>
        </DrawerHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Search Input */}
          <div className="px-4 py-6">
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Find artworks, users, novels..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    handlePerformSearch(query);
                  }
                }}
                className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-accent h-12 rounded-lg border text-base transition-all focus:border-transparent focus:ring-2"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Search Suggestions */}
          {query && (
            <div className="px-4 pb-6">
              {isLoading && (
                <div className="py-6 text-center">
                  <div className="inline-block">
                    <div className="border-accent h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
                  </div>
                </div>
              )}

              {!isLoading && results.suggestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
                    <SearchIcon className="text-muted-foreground h-4 w-4" />
                    Suggestions
                  </h3>
                  <div className="space-y-2">
                    {results.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="hover:bg-muted/50 w-full rounded-lg px-3 py-3 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <SearchIcon className="text-muted-foreground h-4 w-4 shrink-0" />
                          <span className="text-foreground text-sm">
                            {suggestion}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && results.products.length > 0 && (
                <div>
                  <h3 className="text-foreground mb-3 text-sm font-semibold">
                    Products
                  </h3>
                  <div className="space-y-2">
                    {results.products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelectProduct(product.name)}
                        className="hover:bg-muted/50 w-full rounded-lg px-3 py-3 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-8 w-8 shrink-0 rounded object-cover"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-foreground truncate text-sm">
                              {product.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isLoading &&
                results.suggestions.length === 0 &&
                results.products.length === 0 && (
                  <div className="py-6 text-center">
                    <p className="text-muted-foreground text-sm">
                      No results found for &quot;{query}&quot;
                    </p>
                  </div>
                )}
            </div>
          )}

          {/* Recent Searches Section */}
          {!query && recentHistory.length > 0 && (
            <div className="px-4 pb-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <h3 className="text-foreground text-sm font-semibold">
                    Recent Searches
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted h-auto rounded px-2 py-1 text-xs"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-2">
                {recentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="group hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 transition-colors"
                    onClick={() => handleSelectHistory(item)}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <Clock className="text-muted-foreground h-4 w-4 shrink-0" />
                      <span className="text-foreground truncate text-sm">
                        {item.query}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(item.id);
                      }}
                      className="hover:bg-muted ml-2 shrink-0 rounded p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label={`Remove ${item.query} from history`}
                    >
                      <X className="text-muted-foreground h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags */}
          {!query && recentHistory.length === 0 && (
            <div className="px-4 pb-6">
              <div className="mb-4 flex items-center gap-2">
                <Zap className="text-accent h-4 w-4" />
                <h3 className="text-foreground text-sm font-semibold">
                  Popular Tags
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Anime",
                  "Illustration",
                  "Comic",
                  "Digital Art",
                  "Character",
                  "Landscape",
                  "Photography",
                  "Design",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSelectTag(tag)}
                    className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/30 rounded-full border px-4 py-2 text-sm font-medium transition-all active:scale-95"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!query && recentHistory.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-muted-foreground text-sm">
                Start searching to build your search history
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
