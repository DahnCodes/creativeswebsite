"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, Plus, Clock, TrendingUp, User, Settings, LogOut, Palette } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { ThemeSelector } from "@/components/theme-selector"

interface HeaderProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onFilterChange?: (filter: string) => void
  showSearch?: boolean
}

export function Header({ searchQuery = "", onSearchChange, onFilterChange, showSearch = true }: HeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">Creatives</h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          )}

          {showSearch && onFilterChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onFilterChange("recent")}>
                  <Clock className="mr-2 h-4 w-4" />
                  Most Recent
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onFilterChange("popular")}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Most Popular
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <ThemeSelector />

          {user ? (
            <>
              <Link href="/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/themes">
                    <DropdownMenuItem>
                      <Palette className="mr-2 h-4 w-4" />
                      Themes
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
