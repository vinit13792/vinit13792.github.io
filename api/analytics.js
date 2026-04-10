// Simple in-memory analytics (for demo)
// In production, use Vercel KV or Postgres
const pageViews = new Map();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action, page } = req.query;

  try {
    if (req.method === 'POST') {
      const { page: pageName, action: actionName } = req.body;

      if (actionName === 'view' && pageName) {
        const currentViews = pageViews.get(pageName) || 0;
        pageViews.set(pageName, currentViews + 1);
      }

      if (actionName === 'click' && pageName) {
        const clickKey = `${pageName}_clicks`;
        const currentClicks = pageViews.get(clickKey) || 0;
        pageViews.set(clickKey, currentClicks + 1);
      }

      return res.status(200).json({ success: true });
    }

    if (req.method === 'GET') {
      const stats = {};
      for (const [key, value] of pageViews.entries()) {
        stats[key] = value;
      }
      return res.status(200).json(stats);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}