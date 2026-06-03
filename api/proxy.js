export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-MBX-APIKEY, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path, query } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  const binanceUrl = `https://api.binance.com${path}${query ? '?' + query : ''}`;

  try {
    const headers = {};
    if (req.headers['x-mbx-apikey']) {
      headers['X-MBX-APIKEY'] = req.headers['x-mbx-apikey'];
    }

    const response = await fetch(binanceUrl, {
      method: req.method,
      headers
    });

    const body = await response.text();

    res.setHeader('Content-Type', 'application/json');
    return res.status(response.status).send(body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
