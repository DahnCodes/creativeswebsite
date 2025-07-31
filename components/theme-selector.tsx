"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Palette, Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

const colorThemes = [
  { name: "Default", value: "default", color: "bg-gray-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Yellow", value: "yellow", color: "bg-yellow-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Blue", value: "blue", color: "bg-blue-500" },
  { name: "Red", value: "red", color: "bg-red-500" },
  { name: "Orange", value: "orange", color: "bg-orange-500" },
]

export function ThemeSelector() {
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-sm font-semibold">Theme Mode</div>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light Mode
          {theme === "light" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark Mode
          {theme === "dark" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5 text-sm font-semibold">Color Theme</div>
        {colorThemes.map((color) => (
          <DropdownMenuItem key={color.value} onClick={() => setColorTheme(color.value as any)}>
            <div className={`mr-2 h-4 w-4 rounded-full ${color.color}`} />
            {color.name}
            {colorTheme === color.value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
