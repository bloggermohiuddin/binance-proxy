# Binance API Proxy

A simple Vercel serverless function that proxies requests to Binance API, bypassing geo-restrictions.

## Usage

```
https://binance-proxy-six-kohl.vercel.app/proxy?path=/api/v3/time
https://binance-proxy-six-kohl.vercel.app/proxy?path=/sapi/v1/capital/deposit/hisrec&query=coin=USDT
```

## Deploy

1. Import this repo to Vercel
2. Set region to `iad1` (US East) via vercel.json
3. Use the URL in your application's Binance proxy config
