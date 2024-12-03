// components/ScientificCalculator.jsx
import React, { useState } from 'react';
import './styles/ScientificCalculator.css';

function ScientificCalculator() {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

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
    };

    const handleFunction = (func) => {
        switch (func) {
            case 'sin':
                setEquation(`Math.sin(${equation})`);
                break;
            case 'cos':
                setEquation(`Math.cos(${equation})`);
                break;
            case 'tan':
                setEquation(`Math.tan(${equation})`);
                break;
            case 'sqrt':
                setEquation(`Math.sqrt(${equation})`);
                break;
            case 'log':
                setEquation(`Math.log10(${equation})`);
                break;
            case 'ln':
                setEquation(`Math.log(${equation})`);
                break;
            case 'pow2':
                setEquation(`Math.pow(${equation}, 2)`);
                break;
            case 'pow3':
                setEquation(`Math.pow(${equation}, 3)`);
                break;
        }
    };

    const calculate = () => {
        try {
            const result = eval(equation);
            setDisplay(result.toString());
            setEquation(result.toString());
        } catch (error) {
            setDisplay('Error');
            setEquation('');
        }
    };

    const clear = () => {
        setDisplay('0');
        setEquation('');
    };

    return (
        <div className="scientific-calculator">
            <div className="display">
                <div className="equation">{equation || '0'}</div>
                <div className="current">{display}</div>
            </div>

            <div className="scientific-keypad">
                <button onClick={() => handleFunction('sin')}>sin</button>
                <button onClick={() => handleFunction('cos')}>cos</button>
                <button onClick={() => handleFunction('tan')}>tan</button>
                <button onClick={() => handleFunction('sqrt')}>√</button>

                <button onClick={() => handleFunction('log')}>log</button>
                <button onClick={() => handleFunction('ln')}>ln</button>
                <button onClick={() => handleFunction('pow2')}>x²</button>
                <button onClick={() => handleFunction('pow3')}>x³</button>

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
                <button onClick={() => handleNumber('π')}>π</button>

                <button onClick={() => handleNumber('1')}>1</button>
                <button onClick={() => handleNumber('2')}>2</button>
                <button onClick={() => handleNumber('3')}>3</button>
                <button onClick={() => handleNumber('.')}>.</button>

                <button onClick={() => handleNumber('0')}>0</button>
                <button onClick={calculate} className="equals">=</button>
            </div>
        </div>
    );
}

export default ScientificCalculator;