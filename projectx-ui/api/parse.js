export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { query } = req.body;
  const tokens = typeof query === 'string'
    ? query.trim().split(/\s+/)
    : [];
  res.status(200).json({ tokens });
}
