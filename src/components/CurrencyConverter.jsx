// components/CurrencyConverter.jsx
import React, { useState, useEffect } from 'react';
import './styles/CurrencyConverter.css';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (!fromCurrency || !toCurrency) return;
      
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rate');
        }
        
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
      } catch (err) {
        setError('Failed to fetch exchange rate. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const convert = () => {
    if (!amount || !exchangeRate) return '';
    return (amount * exchangeRate).toFixed(2);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="converter-inputs">
        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="amount-input"
          />
          
          <select 
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="currency-select"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleSwapCurrencies}
          className="swap-button"
        >
          ⇄
        </button>

        <div className="input-group">
          <input
            type="number"
            value={convert()}
            readOnly
            className="amount-input result"
            placeholder="Converted amount"
          />
          
          <select 
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="currency-select"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="loading">Loading exchange rates...</div>}
      
      {exchangeRate && !loading && (
        <div className="exchange-rate">
          1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;