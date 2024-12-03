// components/Calculator.jsx
import React, { useState } from 'react';
import './styles/Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasDecimal, setHasDecimal] = useState(false);

  const handleNumber = (number) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
    setEquation(equation + number);
  };

  const handleOperator = (operator) => {
    setDisplay('0');
    setEquation(equation + operator);
    setHasDecimal(false);
  };

  const handleDecimal = () => {
    if (!hasDecimal) {
      setDisplay(display + '.');
      setEquation(equation + '.');
      setHasDecimal(true);
    }
  };

  const calculate = () => {
    try {
      const result = eval(equation);
      setDisplay(result.toString());
      setEquation(result.toString());
      setHasDecimal(result.toString().includes('.'));
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setHasDecimal(false);
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setHasDecimal(false);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation">{equation || '0'}</div>
        <div className="current">{display}</div>
      </div>
      
      <div className="keypad">
        <button onClick={clear} className="special">C</button>
        <button onClick={() => handleOperator('/')} className="operator">÷</button>
        <button onClick={() => handleOperator('*')} className="operator">×</button>
        <button onClick={() => handleOperator('-')} className="operator">-</button>
        
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('+')} className="operator">+</button>
        
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={calculate} className="equals operator">=</button>
        
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleNumber('0')}>0</button>
        
        <button onClick={handleDecimal}>.</button>
      </div>
    </div>
  );
}

export default Calculator;