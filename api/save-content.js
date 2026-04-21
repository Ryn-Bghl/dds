import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const content = req.body;

  try {
    // 1. Try to save to Upstash Redis if configured
    if (process.env.UPSTASH_REDIS_REST_URL) {
      await redis.set('site-content', content);
      console.log('✅ Content saved to Upstash Redis');
      return res.status(200).json({ success: true, storage: 'redis' });
    }

    // 2. Fallback to local file system for local development
    const DATA_FILE = path.join(process.cwd(), 'public', 'data.json');
    if (fs.existsSync(path.dirname(DATA_FILE))) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2));
      console.log('✅ Content saved to public/data.json');
      return res.status(200).json({ success: true, storage: 'file' });
    }

    return res.status(500).json({ error: 'No storage available' });
  } catch (error) {
    console.error('❌ Error saving content:', error);
    return res.status(500).json({ error: error.message });
  }
}
