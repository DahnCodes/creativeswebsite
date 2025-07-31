"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, ImageIcon, Video, FileText, Eye, Save, Send, Loader2, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Header } from "@/components/header"
import { useAuth } from "@/contexts/auth-context"

export default function CreatePage() {
  const router = useRouter()
  const { user, addPost } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [success, setSuccess] = useState("")

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    tags: "",
    isDraft: false,
    category: "design",
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([])
  const [tagList, setTagList] = useState<string[]>([])

  // Redirect if not authenticated
  if (!user) {
    router.push("/auth/signin")
    return null
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const validFiles = files.filter((file) => {
        const isValidType = file.type.startsWith("image/") || file.type.startsWith("video/")
        const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB limit
        return isValidType && isValidSize
      })

      if (validFiles.length !== files.length) {
        alert("Some files were skipped. Only images and videos under 10MB are allowed.")
      }

      // Create preview URLs for the new files
      const newPreviewUrls = validFiles.map((file) => {
        if (file.type.startsWith("image/")) {
          return URL.createObjectURL(file)
        }
        return "/placeholder.svg?height=200&width=300"
      })

      setSelectedFiles((prev) => [...prev, ...validFiles])
      setFilePreviewUrls((prev) => [...prev, ...newPreviewUrls])
    }
  }

  const removeFile = (index: number) => {
    // Revoke the object URL to free memory
    if (filePreviewUrls[index] && filePreviewUrls[index].startsWith("blob:")) {
      URL.revokeObjectURL(filePreviewUrls[index])
    }

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setFilePreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && postData.tags.trim()) {
      e.preventDefault()
      const newTag = postData.tags.trim().toLowerCase()
      if (!tagList.includes(newTag) && tagList.length < 10) {
        setTagList((prev) => [...prev, newTag])
        setPostData((prev) => ({ ...prev, tags: "" }))
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTagList((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!postData.title.trim()) {
      alert("Please add a title for your post.")
      return
    }

    if (selectedFiles.length === 0) {
      alert("Please upload at least one file.")
      return
    }

    setIsLoading(true)

    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Use the first uploaded image as the main image
      const mainImageUrl = filePreviewUrls[0] || "/placeholder.svg?height=400&width=600"

      // Add post to context with the actual uploaded image
      addPost({
        title: postData.title,
        description: postData.description,
        image: mainImageUrl,
        tags: tagList,
        category: postData.category,
        isDraft: postData.isDraft,
      })

      setSuccess(postData.isDraft ? "Draft saved successfully!" : "Post published successfully!")

      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      alert("Failed to create post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = () => {
    if (!postData.title.trim()) {
      alert("Please add a title to preview your post.")
      return
    }
    setShowPreview(true)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  // Clean up object URLs when component unmounts
  const useEffect = React.useEffect
  useEffect(() => {
    return () => {
      filePreviewUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Share Your Creative Work</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label>Category</Label>
                <div className="flex flex-wrap gap-2">
                  {["design", "photography", "illustration"].map((category) => (
                    <Button
                      key={category}
                      type="button"
                      variant={postData.category === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPostData((prev) => ({ ...prev, category }))}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <Label>Upload Files *</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Drag and drop your files here, or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">Images and videos up to 10MB</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={isLoading}
                  >
                    Choose Files
                  </Button>
                </div>

                {/* Selected Files */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files ({selectedFiles.length})</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(file)}
                              <span className="text-sm font-medium truncate">{file.name}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              disabled={isLoading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {file.type.startsWith("image/") && filePreviewUrls[index] && (
                            <img
                              src={filePreviewUrls[index] || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-32 object-cover rounded"
                            />
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Give your work a title"
                  value={postData.title}
                  onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your creative process, inspiration, or techniques used..."
                  rows={4}
                  value={postData.description}
                  onChange={(e) => setPostData((prev) => ({ ...prev, description: e.target.value }))}
                  disabled={isLoading}
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (Press Enter to add)</Label>
                <Input
                  id="tags"
                  placeholder="Add tags to help others discover your work"
                  value={postData.tags}
                  onChange={(e) => setPostData((prev) => ({ ...prev, tags: e.target.value }))}
                  onKeyDown={addTag}
                  disabled={isLoading || tagList.length >= 10}
                />
                {tagList.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tagList.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => removeTag(tag)}
                      >
                        #{tag}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">{tagList.length}/10 tags used</p>
              </div>

              {/* Draft Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="draft"
                  checked={postData.isDraft}
                  onCheckedChange={(checked) => setPostData((prev) => ({ ...prev, isDraft: checked }))}
                  disabled={isLoading}
                />
                <Label htmlFor="draft">Save as draft</Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {postData.isDraft ? "Saving..." : "Publishing..."}
                    </>
                  ) : (
                    <>
                      {postData.isDraft ? (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Draft
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Publish Post
                        </>
                      )}
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handlePreview} disabled={isLoading}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{postData.title}</h3>
              {postData.description && <p className="text-muted-foreground mt-2">{postData.description}</p>}
            </div>

            {filePreviewUrls.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {filePreviewUrls.slice(0, 3).map((url, index) => (
                  <div key={index}>
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                ))}
                {filePreviewUrls.length > 3 && (
                  <p className="text-sm text-muted-foreground">+{filePreviewUrls.length - 3} more files</p>
                )}
              </div>
            )}

            {tagList.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tagList.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
