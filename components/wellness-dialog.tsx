
"use client"

import * as React from "react"
import { Heart, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export interface WellnessDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function WellnessDialog({ open, setOpen }: WellnessDialogProps) {
  const [thoughts, setThoughts] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Process thoughts and enhance music recommendations
      // This is where you'd integrate with your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setOpen(false)
      alert("Thank you for sharing! Your thoughts will help us provide better music recommendations.")
    } catch (error) {
      console.error('Error:', error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
      setThoughts("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            Journal Your Thoughts
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p>Share what's on your mind to help us enhance your music recommendations.</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded-md">
              <Lock className="h-4 w-4" />
              Your thoughts are completely private and will be deleted immediately after processing.
            </div>
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="How are you really feeling today? What's on your mind?"
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          className="min-h-[200px] resize-none"
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Maybe Later
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !thoughts.trim()}
          >
            {isLoading ? "Processing..." : "Share Privately"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
