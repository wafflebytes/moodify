import { Card, CardContent } from "@/components/ui/card"
import { Headphones } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function PodcastRecommendation() {
  return (
    <Card className="w-[200px]">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src="/placeholder.svg"
            alt="Podcast cover"
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-2 right-2 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Headphones className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm truncate">Podcast Title</h3>
          <p className="text-xs text-muted-foreground truncate">Host Name</p>
        </div>
      </CardContent>
    </Card>
  )
}
