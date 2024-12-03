// App.jsx
import React, { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';

// Components
import Calculator from './components/Calculator';
import ScientificCalculator from './components/ScientificCalculator';
import UnitConverter from './components/UnitConverter';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <RecoilRoot>
      <div className="app-container">
        <h1>Calculator & Converter</h1>
        
        <div className="tab-container">
          <button 
            className={`tab ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            Basic Calculator
          </button>
          <button 
            className={`tab ${activeTab === 'scientific' ? 'active' : ''}`}
            onClick={() => setActiveTab('scientific')}
          >
            Scientific Calculator
          </button>
          <button 
            className={`tab ${activeTab === 'unit' ? 'active' : ''}`}
            onClick={() => setActiveTab('unit')}
          >
            Unit Converter
          </button>
          <button 
            className={`tab ${activeTab === 'currency' ? 'active' : ''}`}
            onClick={() => setActiveTab('currency')}
          >
            Currency Converter
          </button>
        </div>

        <div className="content-container">
          {activeTab === 'calculator' && <Calculator />}
          {activeTab === 'scientific' && <ScientificCalculator />}
          {activeTab === 'unit' && <UnitConverter />}
          {activeTab === 'currency' && <CurrencyConverter />}
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;