// src/atoms/calculatorState.js
import { atom } from 'recoil';

export const displayState = atom({
  key: 'displayState',
  default: '0'
});

export const equationState = atom({
  key: 'equationState',
  default: ''
});

export const activeTabState = atom({
  key: 'activeTabState',
  default: 'calculator'
});

export const currencyRatesState = atom({
  key: 'currencyRatesState',
  default: null
});