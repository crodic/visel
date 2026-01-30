"use client";

import React, { useEffect, useState, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import { SearchPopover } from "./search-popover";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Sample data
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Portable Charger",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    name: "USB-C Cable",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=200&h=200&fit=crop",
  },
];

const MOCK_CATEGORIES = [
  "Electronics",
  "Audio",
  "Accessories",
  "Mobile Devices",
  "Chargers",
];

const MOCK_SUGGESTIONS: Record<string, string[]> = {
  wireless: ["wireless headphones", "wireless charger", "wireless speaker"],
  phone: ["phone case", "phone charger", "phone protector"],
  charger: ["charger cable", "fast charger", "wireless charger"],
  cable: ["usb cable", "lightning cable", "usb-c cable"],
};

const MOCK_RECENT_HISTORY = [
  { id: "1", query: "wireless headphones" },
  { id: "2", query: "phone case" },
  { id: "3", query: "charger" },
];

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blurTimerRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get filtered results from sample data
  const getFilteredResults = () => {
    if (!query.trim()) {
      return {
        suggestions: [],
        categories: MOCK_CATEGORIES.slice(0, 6),
        products: [],
      };
    }

    const q = query.toLowerCase();
    const matchingSuggestions = Object.entries(MOCK_SUGGESTIONS)
      .filter(([key]) => key.includes(q))
      .flatMap(([, subs]) => subs)
      .slice(0, 5);

    const matchingCategories = MOCK_CATEGORIES.filter((cat) =>
      cat.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchingProducts = MOCK_PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(q)
    ).slice(0, 5);

    return {
      suggestions: matchingSuggestions,
      categories: matchingCategories,
      products: matchingProducts,
    };
  };

  const results = getFilteredResults();

  const handleBlur = () => {
    blurTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleInputFocus = () => {
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }
    setIsOpen(true);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }
    setQuery(suggestion);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleSelectCategory = (category: string) => {
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }
    setQuery(category);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleSelectProduct = (product: Product) => {
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }
    setQuery(product.name);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center rounded-full border border-gray-300 bg-white shadow-sm transition-shadow focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 hover:shadow-md">
          <SearchIcon className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleBlur}
            placeholder="Search for products..."
            className="w-full bg-transparent py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 outline-none"
            aria-label="Search products"
          />
        </div>
      </form>

      <SearchPopover
        isOpen={isOpen}
        query={query}
        suggestions={results.suggestions}
        categories={results.categories}
        products={results.products}
        topProducts={MOCK_PRODUCTS.slice(0, 5)}
        recentHistory={MOCK_RECENT_HISTORY}
        onSelectSuggestion={handleSelectSuggestion}
        onSelectCategory={handleSelectCategory}
        onSelectProduct={handleSelectProduct}
        clearHistory={function (): void {
          throw new Error("Function not implemented.");
        }}
        removeFromHistory={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
        isLoading={false}
      />
    </div>
  );
}
