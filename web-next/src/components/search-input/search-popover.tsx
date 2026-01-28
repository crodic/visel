"use client";

import { Search as SearchIcon, Clock, X } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface HistoryItem {
  id: string;
  query: string;
}

interface SearchPopoverProps {
  isOpen: boolean;
  query: string;
  suggestions: string[];
  categories: string[];
  products: Product[];
  topProducts: Product[];
  recentHistory?: HistoryItem[];
  onSelectSuggestion: (suggestion: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  isLoading: boolean;
}

export function SearchPopover({
  isOpen,
  query,
  suggestions,
  categories,
  products,
  topProducts,
  recentHistory = [],
  onSelectSuggestion,
  onSelectCategory,
  onSelectProduct,
  clearHistory,
  removeFromHistory,
  isLoading,
}: SearchPopoverProps) {
  // Check if there's any content to show
  const hasHistoryContent = !query && recentHistory.length > 0;
  const hasTopProducts = !query && topProducts.length > 0;
  const hasSuggestions = query && suggestions.length > 0;
  const hasCategories = query && categories.length > 0;
  const hasProducts = query && products.length > 0;
  const hasNoResults =
    query && !hasSuggestions && !hasCategories && !hasProducts;

  if (
    !isOpen ||
    (!hasHistoryContent &&
      !hasTopProducts &&
      !hasSuggestions &&
      !hasCategories &&
      !hasProducts &&
      !hasNoResults)
  ) {
    return null;
  }

  return (
    <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-[500px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
      {/* Empty State when no history and no top products */}
      {!query && recentHistory.length === 0 && topProducts.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-sm text-gray-500">
            Start typing to search or view your recent searches here
          </p>
        </div>
      )}

      {/* Search History Section (when query is empty) */}
      {!query && recentHistory.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="flex items-center justify-between p-3">
            <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Search History
            </h3>
            {recentHistory.length > 0 && (
              <button
                onClick={() => clearHistory()}
                className="text-xs text-gray-400 transition-colors hover:text-gray-600"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="space-y-1 px-2 pb-2">
            {recentHistory.map((item) => (
              <div
                key={item.id}
                className="group flex cursor-pointer items-center justify-between rounded px-2 py-2 transition-colors hover:bg-gray-50"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectSuggestion(item.query);
                }}
              >
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                  {item.query}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromHistory(item.id);
                  }}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Products Section (when query is empty) */}
      {!query && topProducts.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="p-3">
            <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Top Products
            </h3>
          </div>
          <div className="space-y-2 px-2 pb-2">
            {topProducts.map((product) => (
              <div
                key={product.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectProduct(product);
                }}
                className="flex cursor-pointer items-center gap-3 rounded p-2 transition-colors hover:bg-gray-50"
              >
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions Section */}
      {query && suggestions.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="p-3">
            <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Suggestions
            </h3>
          </div>
          <div className="space-y-1 px-2 pb-2">
            {suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectSuggestion(suggestion);
                }}
                className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-gray-50"
              >
                <SearchIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Section */}
      {query && categories.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="p-3">
            <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Categories
            </h3>
          </div>
          <div className="space-y-1 px-2 pb-2">
            {categories.map((category, idx) => (
              <div
                key={idx}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectCategory(category);
                }}
                className="cursor-pointer rounded p-2 transition-colors hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">{category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Section */}
      {query && products.length > 0 && (
        <div>
          <div className="p-3">
            <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              Products
            </h3>
          </div>
          <div className="space-y-2 px-2 pb-2">
            {products.map((product) => (
              <div
                key={product.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectProduct(product);
                }}
                className="flex cursor-pointer items-center gap-3 rounded p-2 transition-colors hover:bg-gray-50"
              >
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {query &&
        !isLoading &&
        suggestions.length === 0 &&
        categories.length === 0 &&
        products.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">
              No results for &quot;{query}&quot;
            </p>
          </div>
        )}
    </div>
  );
}
