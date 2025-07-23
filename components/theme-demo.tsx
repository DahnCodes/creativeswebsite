"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export function ThemeDemo() {
  const { theme, colorMode } = useTheme()

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Theme Preview</h3>
        <p className="text-muted-foreground">
          Current: {theme} mode with {colorMode} color theme
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sample Post Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold">JD</span>
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-muted-foreground">@johndoe • 2h ago</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Sample Creative Work</h3>
              <p className="text-muted-foreground">This is how your posts will look with the current theme settings.</p>
            </div>
            <div className="mb-4">
              <div className="w-full h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Preview Image</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">#design</Badge>
              <Badge variant="secondary">#creative</Badge>
              <Badge variant="secondary">#art</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                  <Heart className="h-4 w-4 mr-1" />
                  24
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                  <MessageCircle className="h-4 w-4 mr-1" />8
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme Controls Card */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Primary Button</h4>
              <Button className="w-full">Primary Action</Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Secondary Button</h4>
              <Button variant="secondary" className="w-full">
                Secondary Action
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Outline Button</h4>
              <Button variant="outline" className="w-full bg-transparent">
                Outline Action
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Destructive Button</h4>
              <Button variant="destructive" className="w-full">
                Destructive Action
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Color Badges</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
