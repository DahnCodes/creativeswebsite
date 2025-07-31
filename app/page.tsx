"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Users } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"

// Mock user data for different post authors
const mockUsers = {
  "2": { name: "Sarah Chen", username: "sarahdesigns", avatar: "/placeholder.svg?height=40&width=40" },
  "3": { name: "Alex Rivera", username: "alexphoto", avatar: "/placeholder.svg?height=40&width=40" },
  "4": { name: "Maya Patel", username: "mayaillustrates", avatar: "/placeholder.svg?height=40&width=40" },
  "5": { name: "David Kim", username: "davidarch", avatar: "/placeholder.svg?height=40&width=40" },
  "6": { name: "Luna Martinez", username: "lunadigital", avatar: "/placeholder.svg?height=40&width=40" },
  "7": { name: "Emma Thompson", username: "emmabotanical", avatar: "/placeholder.svg?height=40&width=40" },
  "8": { name: "Ryan Foster", username: "ryanux", avatar: "/placeholder.svg?height=40&width=40" },
  "9": { name: "Zoe Williams", username: "zoeportraits", avatar: "/placeholder.svg?height=40&width=40" },
}

export default function HomePage() {
  const { user, posts, toggleLike } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("recent")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

      return matchesSearch && matchesCategory && !post.isDraft
    })
    .sort((a, b) => {
      if (selectedFilter === "popular") {
        return b.likes - a.likes
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onFilterChange={setSelectedFilter} />

      <main className="container mx-auto px-4 py-8">
        {!user && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Showcase Your Creative Work</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join a community of artists, designers, and creators. Share your work, get inspired, and connect with
              fellow creatives.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/auth/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById("feed")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Explore Work
              </Button>
            </div>
          </div>
        )}

        {user && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
            <p className="text-muted-foreground mb-6">Discover amazing creative work from the community</p>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {["all", "design", "photography", "illustration"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "All Categories" : category}
            </Button>
          ))}
        </div>

        {/* Feed */}
        <div id="feed" className="max-w-2xl mx-auto space-y-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No posts found matching your criteria.</p>
              {user && (
                <Link href="/create">
                  <Button className="mt-4">Create Your First Post</Button>
                </Link>
              )}
            </div>
          ) : (
            filteredPosts.map((post) => {
              const postUser =
                post.userId === user?.id
                  ? { name: "You", username: user.username, avatar: user.avatar }
                  : mockUsers[post.userId as keyof typeof mockUsers] || {
                      name: "Anonymous User",
                      username: "anonymous",
                      avatar: "/placeholder.svg?height=40&width=40",
                    }

              return (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="cursor-pointer">
                          <AvatarImage src={postUser.avatar || "/placeholder.svg"} alt={postUser.name} />
                          <AvatarFallback>
                            {postUser.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold cursor-pointer hover:underline">{postUser.name}</p>
                          <p className="text-sm text-muted-foreground">
                            @{postUser.username} • {post.createdAt}
                          </p>
                        </div>
                      </div>
                      {post.userId === user?.id && <Badge variant="secondary">Your Post</Badge>}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground">{post.description}</p>
                    </div>

                    <div className="mb-4">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                        onClick={() => {
                          window.open(post.image, "_blank")
                        }}
                      />
                    </div>
                  <div className="mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => {
                        window.open(post.image, "_blank")
                      }}
                    />
                  </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-secondary/80"
                          onClick={() => setSearchQuery(tag)}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-muted-foreground hover:text-red-500 ${post.isLiked ? "text-red-500" : ""}`}
                          onClick={() => toggleLike(post.id)}
                          disabled={!user}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-blue-500"
                          onClick={() => alert("Comments feature coming soon!")}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-green-500"
                        onClick={() => handleShare(post)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}
