import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Try to get from Upstash Redis first (Live data)
    // Only attempt if env vars are present
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const data = await redis.get('site-content');
      if (data) {
        return res.status(200).json(data);
      }
    }

    // 2. Fallback to local file system
    const DATA_FILE = path.join(process.cwd(), 'public', 'data.json');
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      return res.status(200).json(JSON.parse(fileData));
    }

    return res.status(404).json({ error: 'Content not found' });
  } catch (error) {
    console.error('❌ Error loading content:', error);
    return res.status(500).json({ error: error.message });
  }
}
