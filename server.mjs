
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

app.use(cors());

const albums = [
  { artist: 'The Beatles', album: 'The White Album' },
  { artist: 'Pink Floyd', album: 'The Dark Side of the Moon' },
  { artist: 'Led Zeppelin', album: 'Led Zeppelin IV' },
  { artist: 'Nirvana', album: 'Nevermind' },
  { artist: 'Radiohead', album: 'OK Computer' },
  { artist: 'The Rolling Stones', album: 'Exile on Main Street' },
  { artist: 'Queen', album: 'A Night at the Opera' },
  { artist: 'David Bowie', album: 'The Rise and Fall of Ziggy Stardust' },
  { artist: 'Bob Dylan', album: 'Highway 61 Revisited' },
  { artist: 'The Who', album: "Who's Next" }
];

const API_KEY = '7ba87c1a69cdab38fe488c35785a2df3'; // Your Last.fm API key

let cachedAlbum = null;

app.get('/api/album-art', async (req, res) => {
  try {
    if (cachedAlbum) {
      return res.json(cachedAlbum);
    }

    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
    console.log('Fetching new album:', randomAlbum);

    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${encodeURIComponent(randomAlbum.artist)}&album=${encodeURIComponent(randomAlbum.album)}&format=json`);
    const data = await response.json();

    if (!data.album || !data.album.image || data.album.image.length === 0) {
      throw new Error('No album art found');
    }

    const albumCover = data.album.image.find(img => img.size === 'large')['#text'];

    cachedAlbum = {
      albumUrl: albumCover,
      name: randomAlbum.album,
      artist: randomAlbum.artist
    };

    res.json(cachedAlbum);
  } catch (error) {
    if (cachedAlbum) {
      return res.json(cachedAlbum);
    }
    console.error('Album art error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reset-album', (req, res) => {
  cachedAlbum = null;
  res.json({ message: 'Album cache cleared' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
