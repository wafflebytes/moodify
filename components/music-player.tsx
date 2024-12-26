import { Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function MusicPlayer() {
  const mockSong = {
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAqRXhpZgAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABHb29nbGUAAP/bAIQAAwICAgIBAwICAgMDAwMEBgQEBAQECAYGBQYJCAoKCQgJCQoMDwwKCw4LCQkNEQ0ODxAQERAKDBITEhATDxAQEAEDAwMEAwQIBAQIEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgACAAIAwERAAIRAQMRAf/EABQAAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",  // Black background for Donda
    title: "Hurricane",
    artist: "Kanye West",
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background p-4 flex items-center justify-between border-t">
      <div className="flex items-center space-x-4">
        <img
          src={mockSong.image}
          alt="Album art"
          className="w-12 h-12 rounded-md object-cover bg-neutral-800"
        />
        <div>
          <h3 className="font-semibold">{mockSong.title}</h3>
          <p className="text-sm text-muted-foreground">{mockSong.artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <Play className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center space-x-2 w-1/4">
        <Volume2 className="h-5 w-5 text-muted-foreground" />
        <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
      </div>
    </div>
  )
}
