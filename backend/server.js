const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { getAccessToken, getAndroidVersions } = require('./utils/googlePlay');

const app = express();
app.use(cors());

const METADATA_PATH = path.resolve(__dirname, 'metadata.json');
const METADATA = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf-8'));

app.get('/versions', async (req, res) => {
  try {
    const googlePlayToken = await getAccessToken();
    const results = {};

    for (const appMeta of METADATA) {
      const { store, type, tracks = [], 'package-name': packageName, description } = appMeta;

      if (type === 'mobile' && store === 'google') {
        const trackData = await getAndroidVersions(googlePlayToken, packageName, tracks);
        results[packageName] = { tracks: trackData, description: description || '' };
      }
    }

    res.json(results);
  } catch (err) {
    console.error('Error al obtener versiones:', err.message);
    res.status(500).send('Error al obtener versiones');
  }
});

app.listen(3001, () => console.log('Servidor en http://localhost:3001'));