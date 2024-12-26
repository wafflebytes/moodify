"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const musicData = [
    {"song_title": "Lose Yourself", "album": "8 Mile", "artist": "Eminem"},
    {"song_title": "POWER", "album": "My Beautiful Dark Twisted Fantasy", "artist": "Kanye West"},
    {"song_title": "Can't Tell Me Nothing", "album": "Graduation", "artist": "Kanye West"},
    {"song_title": "Fight The Power", "album": "Fear of a Black Planet", "artist": "Public Enemy"},
    {"song_title": "HUMBLE.", "album": "DAMN.", "artist": "Kendrick Lamar"},
    {"song_title": "All I Do is Win", "album": "Victory", "artist": "DJ Khaled"},
    {"song_title": "Started From the Bottom", "album": "Nothing Was the Same", "artist": "Drake"},
    {"song_title": "Work Hard, Play Hard", "album": "O.N.I.F.C.", "artist": "Wiz Khalifa"},
    {"song_title": "Till I Collapse", "album": "The Eminem Show", "artist": "Eminem"},
    {"song_title": "Stronger", "album": "Graduation", "artist": "Kanye West"},
    {"song_title": "Alright", "album": "To Pimp a Butterfly", "artist": "Kendrick Lamar"},
    {"song_title": "Numb/Encore", "album": "Collision Course", "artist": "Jay-Z & Linkin Park"},
    {"song_title": "Survival", "album": "The Marshall Mathers LP 2", "artist": "Eminem"},
    {"song_title": "Can't Hold Us", "album": "The Heist", "artist": "Macklemore & Ryan Lewis"},
    {"song_title": "DNA.", "album": "DAMN.", "artist": "Kendrick Lamar"},
    {"song_title": "Scenario", "album": "The Low End Theory", "artist": "A Tribe Called Quest"},
    {"song_title": "Get Up Stand Up", "album": "Revolverlution", "artist": "Public Enemy"},
    {"song_title": "Otis", "album": "Watch the Throne", "artist": "Jay-Z & Kanye West"},
    {"song_title": "Bad and Boujee", "album": "Culture", "artist": "Migos"},
    {"song_title": "Hypnotize", "album": "Life After Death", "artist": "The Notorious B.I.G."},
    {"song_title": "Jumpman", "album": "What a Time to Be Alive", "artist": "Drake & Future"},
    {"song_title": "Money Trees", "album": "good kid, m.A.A.d city", "artist": "Kendrick Lamar"},
    {"song_title": "0 to 100 / The Catch Up", "album": "non-album single", "artist": "Drake"},
    {"song_title": "The Next Episode", "album": "2001", "artist": "Dr. Dre"},
    {"song_title": "Go Hard", "album": "We Global", "artist": "DJ Khaled"}
];

export function MusicRecommendation() {
  const [albumArtUrls, setAlbumArtUrls] = useState<{[key: string]: string}>({});
  const [error, setError] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const fetchAlbumArt = async (artist: string, album: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/album-art?artist=${artist}&album=${album}`);
      const data = await response.json();
      if (data.url) {
        setAlbumArtUrls(prev => ({
          ...prev,
          [`${artist}-${album}`]: data.url
        }));
      }
    } catch (error) {
      console.error('Error fetching album art:', error);
    }
  };

  useEffect(() => {
    musicData.forEach(song => {
      fetchAlbumArt(song.artist, song.album);
    });
  }, []);

  useEffect(() => {
    const handleShowRecommendations = () => setShowRecommendations(true);
    window.addEventListener('showMusicRecommendations', handleShowRecommendations);
    return () => window.removeEventListener('showMusicRecommendations', handleShowRecommendations);
  }, []);

  if (!showRecommendations) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Ready to discover your perfect playlist? 🎵</h2>
        <p className="text-muted-foreground">
          Click on "Tune Your Mood" in the sidebar to get personalized music recommendations based on your current vibe!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {musicData.map((song, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-0">
              <div className="relative group">
                <img
                  src={albumArtUrls[`${song.artist}-${song.album}`] || "/placeholder.svg"}
                  alt="Album cover"
                  className="w-full h-[150px] object-cover rounded-t-lg"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm truncate">{song.song_title}</h3>
                <p className="text-xs text-muted-foreground truncate">{song.album} • {song.artist}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
