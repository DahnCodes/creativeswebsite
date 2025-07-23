"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark"
type ColorMode = "default" | "purple" | "yellow" | "green" | "blue" | "red" | "orange"

interface ThemeContextType {
  theme: Theme
  colorMode: ColorMode
  setTheme: (theme: Theme) => void
  setColorMode: (colorMode: ColorMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const colorModes = {
  default: {
    light: {
      primary: "222.2 84% 4.9%",
      primaryForeground: "210 40% 98%",
      secondary: "210 40% 96%",
      secondaryForeground: "222.2 84% 4.9%",
      accent: "210 40% 96%",
      accentForeground: "222.2 84% 4.9%",
      muted: "210 40% 96%",
      mutedForeground: "215.4 16.3% 46.9%",
      border: "214.3 31.8% 91.4%",
      ring: "222.2 84% 4.9%",
    },
    dark: {
      primary: "210 40% 98%",
      primaryForeground: "222.2 84% 4.9%",
      secondary: "217.2 32.6% 17.5%",
      secondaryForeground: "210 40% 98%",
      accent: "217.2 32.6% 17.5%",
      accentForeground: "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      mutedForeground: "215 20.2% 65.1%",
      border: "217.2 32.6% 17.5%",
      ring: "212.7 26.8% 83.9%",
    },
  },
  purple: {
    light: {
      primary: "262.1 83.3% 57.8%",
      primaryForeground: "210 40% 98%",
      secondary: "270 3% 96%",
      secondaryForeground: "262.1 83.3% 57.8%",
      accent: "270 3% 96%",
      accentForeground: "262.1 83.3% 57.8%",
      muted: "270 3% 96%",
      mutedForeground: "215.4 16.3% 46.9%",
      border: "270 6% 90%",
      ring: "262.1 83.3% 57.8%",
    },
    dark: {
      primary: "263.4 70% 50.4%",
      primaryForeground: "210 40% 98%",
      secondary: "270 3.7% 15.9%",
      secondaryForeground: "210 40% 98%",
      accent: "270 3.7% 15.9%",
      accentForeground: "210 40% 98%",
      muted: "270 3.7% 15.9%",
      mutedForeground: "264.4 6.1% 50%",
      border: "270 3.7% 15.9%",
      ring: "263.4 70% 50.4%",
    },
  },
  yellow: {
    light: {
      primary: "47.9 95.8% 53.1%",
      primaryForeground: "26 83.3% 14.1%",
      secondary: "60 4.8% 95.9%",
      secondaryForeground: "24 9.8% 10%",
      accent: "60 4.8% 95.9%",
      accentForeground: "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      mutedForeground: "25 5.3% 44.7%",
      border: "60 9% 89%",
      ring: "47.9 95.8% 53.1%",
    },
    dark: {
      primary: "47.9 95.8% 53.1%",
      primaryForeground: "26 83.3% 14.1%",
      secondary: "12 6.5% 15.1%",
      secondaryForeground: "210 40% 98%",
      accent: "12 6.5% 15.1%",
      accentForeground: "210 40% 98%",
      muted: "12 6.5% 15.1%",
      mutedForeground: "24 5.4% 63.9%",
      border: "12 6.5% 15.1%",
      ring: "47.9 95.8% 53.1%",
    },
  },
  green: {
    light: {
      primary: "142.1 76.2% 36.3%",
      primaryForeground: "355.7 100% 97.3%",
      secondary: "138 11% 96%",
      secondaryForeground: "142.1 76.2% 36.3%",
      accent: "138 11% 96%",
      accentForeground: "142.1 76.2% 36.3%",
      muted: "138 11% 96%",
      mutedForeground: "215.4 16.3% 46.9%",
      border: "138 13% 90%",
      ring: "142.1 76.2% 36.3%",
    },
    dark: {
      primary: "142.1 70.6% 45.3%",
      primaryForeground: "144.9 80.4% 10%",
      secondary: "138 3.5% 15.9%",
      secondaryForeground: "210 40% 98%",
      accent: "138 3.5% 15.9%",
      accentForeground: "210 40% 98%",
      muted: "138 3.5% 15.9%",
      mutedForeground: "142.1 4.1% 50%",
      border: "138 3.5% 15.9%",
      ring: "142.1 70.6% 45.3%",
    },
  },
  blue: {
    light: {
      primary: "221.2 83.2% 53.3%",
      primaryForeground: "210 40% 98%",
      secondary: "220 14.3% 95.9%",
      secondaryForeground: "220.9 39.3% 11%",
      accent: "220 14.3% 95.9%",
      accentForeground: "220.9 39.3% 11%",
      muted: "220 14.3% 95.9%",
      mutedForeground: "220 8.9% 46.1%",
      border: "220 13% 91%",
      ring: "221.2 83.2% 53.3%",
    },
    dark: {
      primary: "217.2 91.2% 59.8%",
      primaryForeground: "222.2 84% 4.9%",
      secondary: "217.2 32.6% 17.5%",
      secondaryForeground: "210 40% 98%",
      accent: "217.2 32.6% 17.5%",
      accentForeground: "210 40% 98%",
      muted: "217.2 32.6% 17.5%",
      mutedForeground: "215 20.2% 65.1%",
      border: "217.2 32.6% 17.5%",
      ring: "217.2 91.2% 59.8%",
    },
  },
  red: {
    light: {
      primary: "0 72.2% 50.6%",
      primaryForeground: "210 40% 98%",
      secondary: "0 0% 96.1%",
      secondaryForeground: "0 0% 9%",
      accent: "0 0% 96.1%",
      accentForeground: "0 0% 9%",
      muted: "0 0% 96.1%",
      mutedForeground: "0 0% 45.1%",
      border: "0 0% 89.8%",
      ring: "0 72.2% 50.6%",
    },
    dark: {
      primary: "0 62.8% 30.6%",
      primaryForeground: "210 40% 98%",
      secondary: "0 0% 14.9%",
      secondaryForeground: "210 40% 98%",
      accent: "0 0% 14.9%",
      accentForeground: "210 40% 98%",
      muted: "0 0% 14.9%",
      mutedForeground: "0 0% 63.9%",
      border: "0 0% 14.9%",
      ring: "0 62.8% 30.6%",
    },
  },
  orange: {
    light: {
      primary: "24.6 95% 53.1%",
      primaryForeground: "210 40% 98%",
      secondary: "60 4.8% 95.9%",
      secondaryForeground: "24 9.8% 10%",
      accent: "60 4.8% 95.9%",
      accentForeground: "24 9.8% 10%",
      muted: "60 4.8% 95.9%",
      mutedForeground: "25 5.3% 44.7%",
      border: "60 9% 89%",
      ring: "24.6 95% 53.1%",
    },
    dark: {
      primary: "20.5 90.2% 48.2%",
      primaryForeground: "210 40% 98%",
      secondary: "12 6.5% 15.1%",
      secondaryForeground: "210 40% 98%",
      accent: "12 6.5% 15.1%",
      accentForeground: "210 40% 98%",
      muted: "12 6.5% 15.1%",
      mutedForeground: "24 5.4% 63.9%",
      border: "12 6.5% 15.1%",
      ring: "20.5 90.2% 48.2%",
    },
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [colorMode, setColorMode] = useState<ColorMode>("default")

  useEffect(() => {
    // Load saved theme and color mode
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedColorMode = localStorage.getItem("colorMode") as ColorMode

    if (savedTheme) {
      setTheme(savedTheme)
    }

    if (savedColorMode) {
      setColorMode(savedColorMode)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove("light", "dark")
    root.classList.add(theme)

    // Apply color mode variables
    const colors = colorModes[colorMode][theme]

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value)
    })

    // Save to localStorage
    localStorage.setItem("theme", theme)
    localStorage.setItem("colorMode", colorMode)
  }, [theme, colorMode])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  const handleSetColorMode = (newColorMode: ColorMode) => {
    setColorMode(newColorMode)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorMode,
        setTheme: handleSetTheme,
        setColorMode: handleSetColorMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
