"use client"
import Link from "next/link"
import { LayoutDashboard, Calendar, Music, ListMusic, Heart, Settings, Smile } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TuneYourMoodDialog } from "@/components/tune-your-mood-dialog" // Add this import
import { WellnessDialog } from "@/components/wellness-dialog" // Add this import
import * as React from "react" // Add React import

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Calendar, label: "My Day", href: "/my-day" },
  { icon: Smile, label: "Tune Your Mood", href: "/tune-mood" },
  { icon: Music, label: "Music", href: "/music" },
  { icon: ListMusic, label: "Playlists", href: "/playlists" },
  { icon: Heart, label: "Wellness", href: "/wellness" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const [dialogOpen, setDialogOpen] = React.useState(false) // Add state
  const [wellnessDialogOpen, setWellnessDialogOpen] = React.useState(false) // Add this state

  const updatedSidebarItems = sidebarItems.map(item => {
    if (item.label === "Tune Your Mood") {
      return { ...item, onClick: () => setDialogOpen(true), href: "#" }
    }
    if (item.label === "Wellness") {
      return { ...item, onClick: () => setWellnessDialogOpen(true), href: "#" }
    }
    return item
  })

  return (
    <div className="w-64 bg-background h-screen p-4 flex flex-col border-r">
      <h1 className="text-3xl font-bold text-primary mb-8 pl-2">Moodify</h1>
      <nav className="flex-1">
        <ul className="space-y-2">
          {updatedSidebarItems.map((item) => (
            <li key={item.label}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground"
                )}
                asChild
                onClick={item.onClick} // Modify to handle click
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <TuneYourMoodDialog open={dialogOpen} setOpen={setDialogOpen} /> {/* Add dialog */}
      <WellnessDialog open={wellnessDialogOpen} setOpen={setWellnessDialogOpen} />
    </div>
  )
}
