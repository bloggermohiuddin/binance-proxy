# Binance API Proxy

A Vercel serverless function that proxies requests to Binance API from Frankfurt, Germany (bypasses geo-restrictions).

## URL

```
https://binance-proxy-six-kohl.vercel.app
```

## Examples

- `?path=/api/v3/time`
- `?path=/sapi/v1/capital/deposit/hisrec&query=coin=USDT`
- `?path=/api/v3/ticker/price&query=symbol=BTCUSDT`

## Deploy

1. Import this repo to Vercel
2. Region is set to `fra1` (Frankfurt) via vercel.json
3. Use the URL in your application's Binance proxy config
