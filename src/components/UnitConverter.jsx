// components/UnitConverter.jsx
import React, { useState } from 'react';
import './styles/UnitConverter.css';

function UnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [category, setCategory] = useState('length');

  const conversions = {
    length: {
      units: ['meters', 'feet', 'inches', 'kilometers', 'miles'],
      ratios: {
        meters: 1,
        feet: 3.28084,
        inches: 39.3701,
        kilometers: 0.001,
        miles: 0.000621371
      }
    },
    weight: {
      units: ['kilograms', 'pounds', 'ounces', 'grams'],
      ratios: {
        kilograms: 1,
        pounds: 2.20462,
        ounces: 35.274,
        grams: 1000
      }
    },
    temperature: {
      units: ['celsius', 'fahrenheit', 'kelvin'],
      convert: (value, from, to) => {
        if (from === to) return value;
        
        let celsius;
        // Convert to Celsius first
        if (from === 'fahrenheit') {
          celsius = (value - 32) * 5/9;
        } else if (from === 'kelvin') {
          celsius = value - 273.15;
        } else {
          celsius = value;
        }
        
        // Convert from Celsius to target
        if (to === 'fahrenheit') {
          return (celsius * 9/5) + 32;
        } else if (to === 'kelvin') {
          return celsius + 273.15;
        }
        return celsius;
      }
    }
  };

  const convert = () => {
    if (!value) return '';
    
    if (category === 'temperature') {
      return conversions.temperature.convert(
        parseFloat(value),
        fromUnit,
        toUnit
      ).toFixed(2);
    }
    
    const fromRatio = conversions[category].ratios[fromUnit];
    const toRatio = conversions[category].ratios[toUnit];
    return ((value / fromRatio) * toRatio).toFixed(2);
  };

  return (
    <div className="unit-converter">
      <select 
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setFromUnit(conversions[e.target.value].units[0]);
          setToUnit(conversions[e.target.value].units[1]);
        }}
      >
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="temperature">Temperature</option>
      </select>

      <div className="converter-inputs">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        
        <select 
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          {conversions[category].units.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <span>to</span>

        <select 
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
        >
          {conversions[category].units.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <div className="result">
        {value && (
          <p>
            {value} {fromUnit} = {convert()} {toUnit}
          </p>
        )}
      </div>
    </div>
  );
}

export default UnitConverter;