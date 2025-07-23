"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  username: string
  email: string
  bio: string
  avatar: string
}

interface Post {
  id: number
  userId: string
  title: string
  description: string
  image: string
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  isLiked: boolean
  category: string
  isDraft: boolean
}

interface AuthContextType {
  user: User | null
  posts: Post[]
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: any) => Promise<void>
  signOut: () => void
  addPost: (post: Omit<Post, "id" | "userId" | "likes" | "comments" | "createdAt" | "isLiked">) => void
  updatePost: (postId: number, updates: Partial<Post>) => void
  toggleLike: (postId: number) => void
  getUserPosts: () => Post[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    bio: "Digital artist and designer passionate about creating beautiful experiences.",
    avatar: "/placeholder.svg?height=120&width=120",
  },
]

// Mock posts database
const initialPosts: Post[] = [
  {
    id: 1,
    userId: "2",
    title: "Minimalist Brand Identity",
    description: "Clean and modern brand identity design for a tech startup. Focused on simplicity and elegance.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["branding", "logo", "minimalist"],
    likes: 124,
    comments: 18,
    createdAt: "2 hours ago",
    isLiked: false,
    category: "design",
    isDraft: false,
  },
  {
    id: 2,
    userId: "3",
    title: "Urban Street Photography",
    description:
      "Capturing the essence of city life through candid street photography. Shot in downtown during golden hour.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["photography", "street", "urban"],
    likes: 89,
    comments: 12,
    createdAt: "4 hours ago",
    isLiked: false,
    category: "photography",
    isDraft: false,
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    const savedPosts = localStorage.getItem("posts")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Save posts to localStorage whenever posts change
    localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock authentication - in real app, this would validate against backend
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      username: "johndoe",
      email: email,
      bio: "Digital artist and designer passionate about creating beautiful experiences.",
      avatar: "/placeholder.svg?height=120&width=120",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const signUp = async (userData: any) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      username: userData.username,
      email: userData.email,
      bio: userData.bio || "",
      avatar: "/placeholder.svg?height=120&width=120",
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const addPost = (postData: Omit<Post, "id" | "userId" | "likes" | "comments" | "createdAt" | "isLiked">) => {
    if (!user) return

    const newPost: Post = {
      ...postData,
      id: Date.now(),
      userId: user.id,
      likes: 0,
      comments: 0,
      createdAt: "Just now",
      isLiked: false,
    }

    setPosts((prev) => [newPost, ...prev])
  }

  const updatePost = (postId: number, updates: Partial<Post>) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...updates } : post)))
  }

  const toggleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const getUserPosts = () => {
    return posts.filter((post) => post.userId === user?.id)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        posts,
        isLoading,
        signIn,
        signUp,
        signOut,
        addPost,
        updatePost,
        toggleLike,
        getUserPosts,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
