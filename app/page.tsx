import { Sidebar } from "@/components/sidebar"
import { MusicPlayer } from "@/components/music-player"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 pb-24">
        <h1 className="text-4xl font-bold text-primary mb-8">Dashboard</h1>
        <Dashboard />
      </main>
      <MusicPlayer />
    </div>
  )
}
