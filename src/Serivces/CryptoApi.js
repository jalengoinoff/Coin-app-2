export const Coincurrencies = (symbol) => `https://api.coinstats.app/public/v1/fiats/${symbol}`;





export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

  export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;