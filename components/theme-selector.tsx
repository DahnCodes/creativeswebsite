"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Palette, Sun, Moon, Check } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

const colorModes = [
  { value: "default", label: "Default", color: "bg-slate-500" },
  { value: "purple", label: "Purple", color: "bg-purple-500" },
  { value: "yellow", label: "Yellow", color: "bg-yellow-500" },
  { value: "green", label: "Green", color: "bg-green-500" },
  { value: "blue", label: "Blue", color: "bg-blue-500" },
  { value: "red", label: "Red", color: "bg-red-500" },
  { value: "orange", label: "Orange", color: "bg-orange-500" },
]

export function ThemeSelector() {
  const { theme, colorMode, setTheme, setColorMode, toggleTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Theme Mode</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
          {theme === "light" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
          {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        {colorModes.map((mode) => (
          <DropdownMenuItem
            key={mode.value}
            onClick={() => setColorMode(mode.value as any)}
            className="flex items-center"
          >
            <div className={`mr-2 h-4 w-4 rounded-full ${mode.color}`} />
            {mode.label}
            {colorMode === mode.value && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
