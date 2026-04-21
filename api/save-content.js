import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const content = req.body;
  const isVercel = process.env.VERCEL === '1';

  try {
    // 1. Try to save to Upstash Redis if configured
    if (process.env.UPSTASH_REDIS_REST_URL) {
      await redis.set('site-content', content);
      return res.status(200).json({ success: true, storage: 'redis' });
    }

    // 2. Fallback to local file system ONLY if NOT on Vercel
    if (!isVercel) {
      const DATA_FILE = path.join(process.cwd(), 'public', 'data.json');
      fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2));
      return res.status(200).json({ success: true, storage: 'file' });
    }

    // If on Vercel but no Redis configured
    return res.status(500).json({ 
      error: 'Base de données non configurée. Veuillez connecter Upstash Redis sur Vercel pour activer la modification en direct.' 
    });
  } catch (error) {
    console.error('❌ Error saving content:', error);
    return res.status(500).json({ error: error.message });
  }
}
