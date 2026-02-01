"use client";

import React from "react";

import {
  Code2,
  Smartphone,
  Monitor,
  Clock,
  Zap,
  Clock as Click,
} from "lucide-react";
import { ResponsiveSearch } from "@/components/search-input/responsive-search";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border/50 bg-card sticky top-0 z-40 border-b">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-foreground text-2xl font-bold">
                Pixiv-Inspired Search
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Responsive mobile drawer + desktop inline search
              </p>
            </div>
            <ResponsiveSearch />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold">
            Responsive Search Design
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A modern, accessible search component inspired by Pixiv&apos;s
            mobile interface with smooth animations and intuitive interactions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-foreground mb-8 text-2xl font-bold">
            Key Features
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Mobile Drawer"
              description="Tap the search icon to open a full-height bottom drawer with auto-focused input"
              icon={<Smartphone className="h-5 w-5" />}
            />
            <FeatureCard
              title="Desktop Inline"
              description="Inline search box appears in the header on larger screens for efficient access"
              icon={<Monitor className="h-5 w-5" />}
            />
            <FeatureCard
              title="Search History"
              description="Automatically saves recent searches with individual delete and clear all options"
              icon={<Clock className="h-5 w-5" />}
            />
            <FeatureCard
              title="Popular Tags"
              description="Shows trending tags when history is empty to help users discover content"
              icon={<Zap className="h-5 w-5" />}
            />
            <FeatureCard
              title="Smooth Animations"
              description="Polished transitions with swipe gestures and backdrop click to close"
              icon={<span className="text-lg">✨</span>}
            />
            <FeatureCard
              title="Accessible"
              description="Full keyboard support, proper focus management, and ARIA labels throughout"
              icon={<Click className="h-5 w-5" />}
            />
          </div>
        </div>

        {/* Implementation Section */}
        <div className="bg-card border-border/50 mb-12 rounded-xl border p-8">
          <div className="mb-6 flex items-center gap-3">
            <Code2 className="text-accent h-6 w-6" />
            <h3 className="text-foreground text-2xl font-bold">
              Component Structure
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-foreground mb-4 font-semibold">Components</h4>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 font-bold">•</span>
                  <div>
                    <span className="bg-muted rounded px-2 py-1 font-mono text-xs">
                      ResponsiveSearch
                    </span>
                    <p className="mt-1 text-xs">
                      Main wrapper with mobile/desktop logic
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 font-bold">•</span>
                  <div>
                    <span className="bg-muted rounded px-2 py-1 font-mono text-xs">
                      SearchTrigger
                    </span>
                    <p className="mt-1 text-xs">
                      Mobile search button with icon
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 font-bold">•</span>
                  <div>
                    <span className="bg-muted rounded px-2 py-1 font-mono text-xs">
                      SearchDrawer
                    </span>
                    <p className="mt-1 text-xs">
                      Bottom drawer with search input & history
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground mb-4 font-semibold">Behavior</h4>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 font-bold">📱</span>
                  <div>
                    <p className="text-foreground font-medium">Mobile ≤768px</p>
                    <p className="mt-1 text-xs">
                      Shows search button, opens bottom drawer on tap
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 font-bold">🖥️</span>
                  <div>
                    <p className="text-foreground font-medium">
                      Desktop &gt;768px
                    </p>
                    <p className="mt-1 text-xs">
                      Shows full inline search with dropdown
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-border/50 mt-8 border-t pt-6">
            <h4 className="text-foreground mb-3 font-semibold">Quick Start</h4>
            <pre className="bg-background border-border/50 text-muted-foreground overflow-x-auto rounded-lg border p-4 font-mono text-xs">
              {`import { ResponsiveSearch } from '@/components/search/ResponsiveSearch'

export default function Header() {
  return (
    <header>
      <ResponsiveSearch />
    </header>
  )
}`}
            </pre>
          </div>
        </div>

        {/* Interaction Guide */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-accent/5 border-accent/20 rounded-lg border p-6">
            <h4 className="text-accent mb-3 font-semibold">
              Mobile Experience
            </h4>
            <ol className="text-muted-foreground space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-accent font-bold">1.</span>
                <span>Tap the search icon in the header</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">2.</span>
                <span>Bottom drawer slides up smoothly</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">3.</span>
                <span>Input auto-focuses for immediate typing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">4.</span>
                <span>Swipe down or click backdrop to close</span>
              </li>
            </ol>
          </div>

          <div className="bg-primary/5 border-primary/20 rounded-lg border p-6">
            <h4 className="text-primary mb-3 font-semibold">
              Responsive Design
            </h4>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Auto-detects viewport size with useIsMobile()</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Persistent search history via Zustand</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Smooth animations and transitions</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Full keyboard and screen reader support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-card border-border/50 hover:border-accent/30 rounded-lg border p-6 transition-all hover:shadow-sm">
      <div className="bg-accent/10 text-accent mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
        {icon}
      </div>
      <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
