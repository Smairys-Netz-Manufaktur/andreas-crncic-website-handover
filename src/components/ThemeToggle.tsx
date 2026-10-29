'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // Kein Mounted-Guard noetig: Die Icons schalten rein per CSS (`dark:`-Variante),
  // und next-themes setzt die Klasse vor dem ersten Paint. `resolvedTheme` wird
  // erst im Klick gelesen, also nie waehrend der Hydration.
  // `resolvedTheme` statt `theme`: bei `theme === 'system'` wuerde sonst ein
  // Klick im dunklen System-Theme erneut auf "dark" setzen und nichts aendern.
  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex items-center justify-center p-2 transition-colors rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
