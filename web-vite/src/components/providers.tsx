import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DirectionProvider } from '@/context/direction-provider'
import { FontProvider } from '@/context/font-provider'
import { ThemeProvider } from '@/context/theme-provider'
import { Toaster } from './ui/sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FontProvider>
        <DirectionProvider>
          <Toaster duration={5000} />
          {children}
          {import.meta.env.MODE === 'development' && (
            <ReactQueryDevtools buttonPosition='bottom-right' />
          )}
        </DirectionProvider>
      </FontProvider>
    </ThemeProvider>
  )
}
