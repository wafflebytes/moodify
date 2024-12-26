"use client"

import * as React from "react"
import { Music, Sun, Cloud, CloudRain, CloudSnow, Zap, Coffee, Book, Dumbbell, Wind } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export interface TuneYourMoodDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function TuneYourMoodDialog({ open, setOpen }: TuneYourMoodDialogProps) {
  const [mood, setMood] = React.useState<string>("")
  const [activity, setActivity] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [event, setEvent] = React.useState("")
  const [energyLevel, setEnergyLevel] = React.useState(50)
  const [genre, setGenre] = React.useState("")
  const [timeOfDay, setTimeOfDay] = React.useState("")
  const [weather, setWeather] = React.useState("")
  const [wellnessNeeds, setWellnessNeeds] = React.useState<string[]>([])
  const [musicPace, setMusicPace] = React.useState(50)

  const moodEmojis: { [key: string]: string } = {
    happy: "😊",
    sad: "😢",
    energetic: "⚡",
    relaxed: "😌",
    focused: "🧠",
    stressed: "😰",
    excited: "🎉",
    anxious: "😨",
    angry: "😠",
    content: "😌",
    bored: "😑",
    creative: "🎨"
  }

  const activityIcons = {
    studying: "🎓",
    working: "💼",
    relaxing: "🛋️",
    exercising: "🏋️",
    cooking: "🍳",
    commuting: "🚗",
    gaming: "🎮",
    shopping: "🛍️",
    traveling: "✈️"
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const formData = {
        mood: mood,
        activity: activity,
        event: event,
        energy_level: energyLevel,
        genre: genre,
        time_of_day: timeOfDay,
        weather: weather,
        wellness_needs: wellnessNeeds,
        music_pace: musicPace
      }

      console.log('Submitting form data:', formData);

      const response = await fetch('/api/generate-playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error +
          (data.details ? `\n\nDetails: ${data.details}` : '') +
          (data.solution ? `\n\nSolution: ${data.solution}` : '')
        );
      }

      const showRecommendations = window.confirm("Your mood has been tuned! Would you like to see your personalized recommendations?");
      if (showRecommendations) {
        // You'll need to implement a way to share this state between components
        // This could be done via Context, Redux, or other state management solutions
        window.dispatchEvent(new CustomEvent('showMusicRecommendations'));
      }
      setOpen(false);
    } catch (error) {
      console.error('Error details:', error);
      alert(`Error generating playlist:\n\n${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[69%] h-[90vh] max-h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-center gap-2 animate-pulse">
            <Music className="h-8 w-8 text-primary" />
            Let's Tune Your Mood!
          </DialogTitle>
          <DialogDescription className="text-lg">
            Customize your vibe for the perfect playlist! 🎧✨
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-2">
          <div className="space-y-6 py-2">
            <div className="space-y-4">
              <Label htmlFor="mood" className="text-lg font-semibold">How are you feeling? 🤔</Label>
              <div className="flex flex-wrap gap-4 max-h-[150px] overflow-y-auto p-2">
                {Object.entries(moodEmojis).map(([key, emoji]) => (
                  <Button
                    key={key}
                    variant={mood === key ? "default" : "outline"}
                    className="text-xl p-4 rounded-full transition-all duration-200 hover:scale-110"
                    onClick={() => setMood(key)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="activity" className="text-lg font-semibold">What are you up to? 🏃‍♂️</Label>
              <RadioGroup onValueChange={setActivity} className="flex flex-wrap gap-4 max-h-[150px] overflow-y-auto p-2">
                {Object.entries(activityIcons).map(([key, Icon]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={key} className="peer sr-only" />
                    <Label
                      htmlFor={key}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      {typeof Icon === 'string' ? (
                        <span className="text-2xl mb-1">{Icon}</span>
                      ) : (
                        <Icon className="mb-1 h-5 w-5" />
                      )}
                      <span className="text-xs font-medium capitalize">{key}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recent-event" className="text-lg font-semibold">Anything happen recently affecting your mood? 🎭</Label>
              <Input id="recent-event" placeholder="Share if you'd like..." className="text-lg" />
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Energy Level ⚡</Label>
              <div className="flex items-center space-x-4">
                <span className="text-2xl">😴</span>
                <Slider defaultValue={[50]} max={100} step={1} className="flex-grow" />
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-lg font-semibold">Preferred Genre 🎸</Label>
              <Select>
                <SelectTrigger id="genre" className="text-lg">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pop">🎵 Pop</SelectItem>
                  <SelectItem value="rock">🤘 Rock</SelectItem>
                  <SelectItem value="classical">🎻 Classical</SelectItem>
                  <SelectItem value="jazz">🎷 Jazz</SelectItem>
                  <SelectItem value="lofi">🎧 Lo-fi</SelectItem>
                  <SelectItem value="electronic">🎛️ Electronic</SelectItem>
                  <SelectItem value="hiphop">🎤 Hip Hop</SelectItem>
                  <SelectItem value="country">🤠 Country</SelectItem>
                  <SelectItem value="rnb">🎵 R&B</SelectItem>
                  <SelectItem value="indie">🎸 Indie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-lg font-semibold">Time of Day 🕰️</Label>
              <Select>
                <SelectTrigger id="time" className="text-lg">
                  <SelectValue placeholder="Select time of day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">🌅 Morning</SelectItem>
                  <SelectItem value="afternoon">☀️ Afternoon</SelectItem>
                  <SelectItem value="evening">🌆 Evening</SelectItem>
                  <SelectItem value="night">🌙 Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label htmlFor="weather" className="text-lg font-semibold">Current Weather 🌈</Label>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Sun, label: "Sunny" },
                  { icon: CloudRain, label: "Rainy" },
                  { icon: Cloud, label: "Cloudy" },
                  { icon: CloudSnow, label: "Snowy" },
                  { icon: Zap, label: "Stormy" },
                  { icon: Wind, label: "Windy" },
                ].map(({ icon: Icon, label }) => (
                  <Button key={label} variant="outline" className="flex-1 py-6">
                    <Icon className="mr-2 h-5 w-5" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Wellness Needs 🧘‍♀️</Label>
              <div className="flex flex-wrap gap-4">
                {["Stress Relief", "Motivation", "Relaxation", "Focus", "Energy Boost", "Mood Lift", "Emotional Support", "Reflection"].map((need) => (
                  <div key={need} className="flex items-center space-x-2 bg-accent rounded-full px-3 py-1">
                    <Checkbox id={need.toLowerCase()} />
                    <label htmlFor={need.toLowerCase()} className="text-xs font-medium">
                      {need}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Music Pace 🏃‍♂️</Label>
              <div className="flex items-center space-x-4">
                <span className="text-2xl">🐢</span>
                <Slider defaultValue={[50]} max={100} step={1} className="flex-grow" />
                <span className="text-2xl">🐇</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => setOpen(false)} className="text-lg">
            Maybe Later 👋
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="text-lg"
          >
            {isLoading ? "Generating..." : "Tune My Mood!"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
