"use client"

import { Header } from "@/components/header"
import { ThemeDemo } from "@/components/theme-demo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"
import { Palette, Sun, Moon } from "lucide-react"

const colorModes = [
  { value: "default", label: "Default", description: "Classic neutral theme", color: "bg-slate-500" },
  { value: "purple", label: "Purple", description: "Creative and artistic", color: "bg-purple-500" },
  { value: "yellow", label: "Yellow", description: "Bright and energetic", color: "bg-yellow-500" },
  { value: "green", label: "Green", description: "Natural and calming", color: "bg-green-500" },
  { value: "blue", label: "Blue", description: "Professional and trustworthy", color: "bg-blue-500" },
  { value: "red", label: "Red", description: "Bold and passionate", color: "bg-red-500" },
  { value: "orange", label: "Orange", description: "Warm and friendly", color: "bg-orange-500" },
]

export default function ThemesPage() {
  const { theme, colorMode, setTheme, setColorMode } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Customize Your Experience</h1>
          <p className="text-xl text-muted-foreground">
            Choose your preferred theme and color mode to personalize your creative workspace
          </p>
        </div>

        {/* Theme Mode Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="mr-2 h-5 w-5" />
              Theme Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-6 w-6 mb-2" />
                <span className="font-semibold">Light Mode</span>
                <span className="text-sm opacity-70">Clean and bright</span>
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-6 w-6 mb-2" />
                <span className="font-semibold">Dark Mode</span>
                <span className="text-sm opacity-70">Easy on the eyes</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Color Mode Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5" />
              Color Theme
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorModes.map((mode) => (
                <Button
                  key={mode.value}
                  variant={colorMode === mode.value ? "default" : "outline"}
                  className="h-24 flex flex-col items-center justify-center p-4"
                  onClick={() => setColorMode(mode.value as any)}
                >
                  <div className={`h-6 w-6 rounded-full ${mode.color} mb-2`} />
                  <span className="font-semibold">{mode.label}</span>
                  <span className="text-xs opacity-70 text-center">{mode.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Theme Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeDemo />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
