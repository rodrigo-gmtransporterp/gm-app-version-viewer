const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');

const CREDENTIALS_PATH = path.resolve(__dirname, '../credentials.json');
const GOOGLE_SCOPE = ['https://www.googleapis.com/auth/androidpublisher'];

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: GOOGLE_SCOPE,
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  return tokenResponse.token;
}

async function getAndroidVersions(token, packageName, tracks) {
  const results = {};

  for (const track of tracks) {
    const editUrl = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/edits`;
    const editRes = await axios.post(editUrl, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const editId = editRes.data.id;
    const trackUrl = `${editUrl}/${editId}/tracks/${track}`;
    const trackRes = await axios.get(trackUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const release = trackRes.data.releases?.[0] || {};
    const versionCode = release.versionCodes?.[0] || null;

    results[track] = {
      name: release.name || '',
      build: versionCode,
    };
  }

  return results;
}

module.exports = {
  getAccessToken,
  getAndroidVersions,
};
