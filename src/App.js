import React, { useState } from 'react';
import * as math from 'mathjs';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      // Replace custom symbols with mathjs functions
      let expression = input.replace(/√/g, 'sqrt').replace(/\^/g, '^');
      const result = math.evaluate(expression);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const handleFunction = (func) => {
    setInput(func + '(' + input + ')');
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{input || '0'}</div>
        <div className="buttons-grid">
          <button onClick={() => handleFunction('sin')} className="button-function">sin</button>
          <button onClick={() => handleFunction('cos')} className="button-function">cos</button>
          <button onClick={() => handleFunction('tan')} className="button-function">tan</button>
          <button onClick={handleClear} className="button-clear">C</button>

          <button onClick={() => handleClick('pi')} className="button-function">π</button>
          <button onClick={() => handleClick('e')} className="button-function">e</button>
          <button onClick={() => handleClick('^')} className="button-function">^</button>
          <button onClick={() => handleClick('√')} className="button-function">√</button>

          <button onClick={() => handleClick('(')} className="button-operator">(</button>
          <button onClick={() => handleClick(')')} className="button-operator">)</button>
          <button onClick={() => setInput(input.slice(0, -1))} className="button-operator">DEL</button>
          <button onClick={() => handleClick('/')} className="button-operator">÷</button>

          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('*')} className="button-operator">×</button>

          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('-')} className="button-operator">−</button>

          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={() => handleClick('+')} className="button-operator">+</button>

          <button onClick={() => handleClick('0')} className="button-zero">0</button>
          <button onClick={() => handleClick('.')}>.</button>
          <button onClick={handleCalculate} className="button-equal">=</button>
        </div>
      </div>
    </div>
  );
};

export default App;