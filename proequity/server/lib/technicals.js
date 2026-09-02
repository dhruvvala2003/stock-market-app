const average = values => values.reduce((sum, value) => sum + value, 0) / values.length;

const ema = (values, period) => {
  const multiplier = 2 / (period + 1);
  return values.reduce((result, value, index) => {
    result.push(index === 0 ? value : value * multiplier + result[index - 1] * (1 - multiplier));
    return result;
  }, []);
};

const rsi = (closes, period = 14) => {
  if (closes.length <= period) return null;
  let gains = 0; let losses = 0;
  for (let i = 1; i <= period; i += 1) { const change = closes[i] - closes[i - 1]; gains += Math.max(change, 0); losses += Math.max(-change, 0); }
  let avgGain = gains / period; let avgLoss = losses / period;
  for (let i = period + 1; i < closes.length; i += 1) { const change = closes[i] - closes[i - 1]; avgGain = (avgGain * (period - 1) + Math.max(change, 0)) / period; avgLoss = (avgLoss * (period - 1) + Math.max(-change, 0)) / period; }
  return avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss));
};

const calculateIndicators = candles => {
  const closes = candles.map(c => c.close); const latest = closes.at(-1);
  if (closes.length < 35) return { rsi: null, macd: null, sma20: null, atr14: null };
  const ema12 = ema(closes, 12); const ema26 = ema(closes, 26); const macdSeries = ema12.map((value, i) => value - ema26[i]); const signal = ema(macdSeries, 9);
  const trueRanges = candles.slice(1).map((bar, i) => Math.max(bar.high - bar.low, Math.abs(bar.high - candles[i].close), Math.abs(bar.low - candles[i].close)));
  return {
    rsi: rsi(closes), macd: macdSeries.at(-1), macdSignal: signal.at(-1), sma20: average(closes.slice(-20)),
    sma50: closes.length >= 50 ? average(closes.slice(-50)) : null, atr14: average(trueRanges.slice(-14)), latest,
  };
};
module.exports = { calculateIndicators };
