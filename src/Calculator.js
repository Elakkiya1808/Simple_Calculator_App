import React, { useState } from 'react';
import './Calculator.css';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [finalized, setFinalized] = useState(false); // true when = pressed

  const handleClick = (value) => {
    if (finalized) {
      setInput(value);
      setFinalized(false);
    } else {
      setInput((prev) => prev + value);
    }

  if (value !== '=') {
      try {
        const liveInput = (input + value).replace(/\^/g, '**');
        const liveResult = Function(`return ${liveInput}`)();
        setResult(liveResult);
      } catch {
        setResult(null);
      }
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setFinalized(false);
  };

  const handleCalculate = () => {
    try {
        const safeInput = input.replace(/\^/g, '**');
      const evaluated = Function(`return ${safeInput}`)();
      setResult(evaluated);
      setFinalized(true);
      setInput('');
    } catch {
      setResult('Error');
      setFinalized(true);
      setInput('');
    }
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
    setFinalized(false);
    try {
      const newInput = input.slice(0, -1);
      const evalResult = Function(`return ${newInput}`)();
      setResult(evalResult);
    } catch {
      setResult(null);
    }
  };

  const buttons = [
   'C' ,'(', ')', '⌫',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '.', '0', '^','+', 
  ];

  return (
    <div className="calculator-container">
      <div className="display">
        {!finalized ? (input || '0') : ''}
        <div className={`result ${finalized ? 'final-result' : 'live-result'}`}>
          {result !== null && (finalized ? `${result}` : `= ${result}`)}
        </div>
      </div>

      <div className="buttons-grid">
        {buttons.map((btn, index) => (
          <button
  key={index}
  className={`button ${
    btn === 'C' ? 'clear-button' : btn === '⌫' ? 'backspace-button' :  btn === ' ' ? 'empty' : ''
  }`}
  onClick={() => {
    if (btn === '=') handleCalculate();
    else if (btn === '⌫') handleBackspace();
     else if (btn === 'C') handleClear();
    else handleClick(btn);
  }}
>
  {btn}
</button>

        ))}
        <button className="button equals-button" onClick={handleCalculate}>
         =
        </button>
      </div>
    </div>
  );
}

