"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Heart, MessageCircle, Grid, Bookmark, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"

export default function ProfilePage() {
  const router = useRouter()
  const { user, getUserPosts } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
  })
  const [userPosts, setUserPosts] = useState([])
  const [publishedPosts, setPublishedPosts] = useState([])
  const [draftPosts, setDraftPosts] = useState([])

  useEffect(() => {
    if (user) {
      const posts = getUserPosts()
      setUserPosts(posts)
      setPublishedPosts(posts.filter((post) => !post.isDraft))
      setDraftPosts(posts.filter((post) => post.isDraft))
    }
  }, [user])

  // Redirect if not authenticated
  if (!user) {
    router.push("/auth/signin")
    return null
  }

  const handleSave = () => {
    // TODO: Update user profile in context/database
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave}>Save</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-4 mb-2">
                      <h1 className="text-2xl font-bold">{user.name}</h1>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-2">@{user.username}</p>
                    <p className="mb-4">{user.bio}</p>

                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="font-bold">{publishedPosts.length}</div>
                        <div className="text-sm text-muted-foreground">Posts</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{draftPosts.length}</div>
                        <div className="text-sm text-muted-foreground">Drafts</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">0</div>
                        <div className="text-sm text-muted-foreground">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">0</div>
                        <div className="text-sm text-muted-foreground">Following</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <Grid className="h-4 w-4" />
              <span>Posts</span>
            </TabsTrigger>
            <TabsTrigger value="drafts" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Drafts</span>
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Liked</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center space-x-2">
              <Bookmark className="h-4 w-4" />
              <span>Saved</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            {publishedPosts.length === 0 ? (
              <div className="text-center py-12">
                <Grid className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No published posts yet</p>
                <Button onClick={() => router.push("/create")}>Create Your First Post</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{post.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </span>
                        </div>
                        <span>{post.createdAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="mt-6">
            {draftPosts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No drafts yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Draft</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">{post.createdAt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="liked" className="mt-6">
            <div className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No liked posts yet</p>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No saved posts yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
