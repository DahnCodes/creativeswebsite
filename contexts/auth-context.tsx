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

// Mock posts database with actual creative images
const initialPosts: Post[] = [
  {
    id: 1,
    userId: "2",
    title: "Minimalist Brand Identity",
    description: "Clean and modern brand identity design for a tech startup. Focused on simplicity and elegance.",
    image: "/picture.png?height=400&width=600",
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
      "Capturing the essence of city life through candid street photography. Shot in downtown during golden hour with dramatic shadows and warm lighting.",
    image: "/images/street-photography.png",
    tags: ["photography", "street", "urban", "golden-hour"],
    likes: 89,
    comments: 12,
    createdAt: "4 hours ago",
    isLiked: false,
    category: "photography",
    isDraft: false,
  },
  {
    id: 3,
    userId: "4",
    title: "Digital Character Design",
    description:
      "Fantasy character illustration created for an indie game project. Mixed traditional and digital techniques with vibrant colors and detailed textures.",
    image: "/images/character-design.png",
    tags: ["illustration", "character", "digital", "fantasy"],
    likes: 156,
    comments: 24,
    createdAt: "6 hours ago",
    isLiked: true,
    category: "illustration",
    isDraft: false,
  },
  {
    id: 4,
    userId: "5",
    title: "Modern Architecture Photography",
    description:
      "Exploring geometric patterns and clean lines in contemporary architecture. Black and white composition emphasizing form and structure.",
    image: "/images/architecture.png",
    tags: ["photography", "architecture", "geometric", "monochrome"],
    likes: 203,
    comments: 31,
    createdAt: "8 hours ago",
    isLiked: false,
    category: "photography",
    isDraft: false,
  },
  {
    id: 5,
    userId: "6",
    title: "Abstract Digital Art",
    description:
      "Experimental digital composition using fluid dynamics and particle systems. Exploring the intersection of technology and organic forms.",
    image: "/images/abstract-digital.png",
    tags: ["digital-art", "abstract", "experimental", "generative"],
    likes: 78,
    comments: 15,
    createdAt: "12 hours ago",
    isLiked: false,
    category: "design",
    isDraft: false,
  },
  {
    id: 6,
    userId: "7",
    title: "Botanical Illustration Series",
    description:
      "Hand-drawn botanical illustrations featuring native wildflowers. Traditional watercolor techniques with scientific accuracy and artistic beauty.",
    image: "/images/botanical-illustration.png",
    tags: ["illustration", "botanical", "watercolor", "traditional"],
    likes: 142,
    comments: 28,
    createdAt: "1 day ago",
    isLiked: true,
    category: "illustration",
    isDraft: false,
  },
  {
    id: 7,
    userId: "8",
    title: "UI/UX Design System",
    description:
      "Comprehensive design system for a fintech mobile app. Includes components, color palettes, typography, and interaction patterns.",
    image: "/images/ui-design-system.png",
    tags: ["ui-design", "ux-design", "mobile", "design-system"],
    likes: 267,
    comments: 42,
    createdAt: "1 day ago",
    isLiked: false,
    category: "design",
    isDraft: false,
  },
  {
    id: 8,
    userId: "9",
    title: "Portrait Photography Studio",
    description:
      "Professional portrait session with dramatic lighting setup. Exploring mood and emotion through careful use of shadows and highlights.",
    image: "/images/portrait-photography.png",
    tags: ["photography", "portrait", "studio", "lighting"],
    likes: 189,
    comments: 35,
    createdAt: "2 days ago",
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
