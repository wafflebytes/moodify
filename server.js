const express = require('express');
const albumArt = require('album-art');
const cors = require('cors');

const app = express();
const port = 3001;

// Cache for storing album art URLs
const artCache = new Map();

app.use(cors());

const getAlbumArtWithRetry = async (artist, album, retries = 3) => {
    const cacheKey = `${artist}-${album}`;

    // Check cache first
    if (artCache.has(cacheKey)) {
        return artCache.get(cacheKey);
    }

    for (let i = 0; i < retries; i++) {
        try {
            const artUrl = await albumArt(artist, {
                album: album,
                size: 'large'
            });

            if (artUrl && artUrl.startsWith('http')) {
                // Store in cache and return
                artCache.set(cacheKey, artUrl);
                return artUrl;
            }
        } catch (err) {
            console.error(`Attempt ${i + 1} failed:`, err);
            if (i === retries - 1) throw err;
        }
    }
    throw new Error('Failed to fetch album art');
};

app.get('/api/album-art', async (req, res) => {

    const { artist, album } = req.query;
    console.log('Searching for:', { artist, album });

    if (!artist || !album) {
        return res.json({ url: '/placeholder.svg', error: 'Artist and album required' });
    }

    try {
        const artUrl = await getAlbumArtWithRetry(artist, album);
        console.log('Found art URL:', artUrl);
        res.json({ url: artUrl || '/placeholder.svg' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ url: '/placeholder.svg', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
