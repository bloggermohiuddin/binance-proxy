export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-MBX-APIKEY, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path, query } = req.query;

  if (!path) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
<!DOCTYPE html>
<html>
<head><title>Binance API Proxy</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;padding:0 20px;color:#333}
h1{color:#f0b90b;text-shadow:0 2px 4px #0001}
code{background:#f5f5f5;padding:2px 6px;border-radius:4px;font-size:.9em}
pre{background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:8px;overflow-x:auto}
.url{color:#569cd6}
.param{color:#ce9178}
</style>
</head>
<body>
<h1>Binance API Proxy</h1>
<p>Proxies requests to Binance API from a non-restricted region.</p>

<h2>Usage</h2>
<pre>?<span class="param">path</span>=<span class="url">/api/v3/time</span>
?<span class="param">path</span>=<span class="url">/sapi/v1/capital/deposit/hisrec</span>&<span class="param">query</span>=<span class="url">coin=USDT</span></pre>

<h2>Examples</h2>
<p><a href="?path=/api/v3/time">Server time</a></p>
<p><a href="?path=/api/v3/ticker/price&query=symbol=BTCUSDT">BTC price</a></p>

<h2>Source</h2>
<p><a href="https://github.com/bloggermohiuddin/binance-proxy">github.com/bloggermohiuddin/binance-proxy</a></p>
</body>
</html>
    `);
  }

  const binanceUrl = `https://api.binance.com${path}${query ? '?' + query : ''}`;

  try {
    const headers = {};
    if (req.headers['x-mbx-apikey']) {
      headers['X-MBX-APIKEY'] = req.headers['x-mbx-apikey'];
    }

    const response = await fetch(binanceUrl, { method: req.method, headers });
    const body = await response.text();

    res.setHeader('Content-Type', 'application/json');
    return res.status(response.status).send(body);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
