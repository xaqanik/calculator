import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Calculator', () => {
  test('renders calculator', () => {
    render(<App />);
    const display = screen.getByText('0');
    expect(display).toBeInTheDocument();
  });

  test('handles number clicks', () => {
    render(<App />);
    const sevenButton = screen.getByText('7');
    fireEvent.click(sevenButton);
    const display = screen.getByText('7');
    expect(display).toBeInTheDocument();
  });

  test('handles multiple number clicks', () => {
    render(<App />);
    const sevenButton = screen.getByText('7');
    fireEvent.click(sevenButton);
    const eightButton = screen.getByText('8');
    fireEvent.click(eightButton);
    const display = screen.getByText('78');
    expect(display).toBeInTheDocument();
  });

  test('handles operator clicks', () => {
    render(<App />);
    const sevenButton = screen.getByText('7');
    fireEvent.click(sevenButton);
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    const eightButton = screen.getByText('8');
    fireEvent.click(eightButton);
    const display = screen.getByText('7+8');
    expect(display).toBeInTheDocument();
  });

  test('handles clear click', () => {
    render(<App />);
    const sevenButton = screen.getByText('7');
    fireEvent.click(sevenButton);
    const clearButton = screen.getByText('C');
    fireEvent.click(clearButton);
    const display = screen.getByText('0');
    expect(display).toBeInTheDocument();
  });

  test('handles calculation', () => {
    render(<App />);
    const sevenButton = screen.getByText('7');
    fireEvent.click(sevenButton);
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    const eightButton = screen.getByText('8');
    fireEvent.click(eightButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('15');
    expect(display).toBeInTheDocument();
  });

  test('handles division', () => {
    render(<App />);
    const oneButton = screen.getByText('1');
    fireEvent.click(oneButton);
    const zeroButton = screen.getByText('0');
    fireEvent.click(zeroButton);
    const divideButton = screen.getByText('÷');
    fireEvent.click(divideButton);
    const twoButton = screen.getByText('2');
    fireEvent.click(twoButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('5');
    expect(display).toBeInTheDocument();
  });

  test('handles multiplication', () => {
    render(<App />);
    const sevenButton = screen.getByText('7');
    fireEvent.click(sevenButton);
    const multiplyButton = screen.getByText('×');
    fireEvent.click(multiplyButton);
    const eightButton = screen.getByText('8');
    fireEvent.click(eightButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('56');
    expect(display).toBeInTheDocument();
  });

  test('handles subtraction', () => {
    render(<App />);
    const sevenButton = screen.getByText('7');
    fireEvent.click(sevenButton);
    const subtractButton = screen.getByText('−');
    fireEvent.click(subtractButton);
    const eightButton = screen.getByText('8');
    fireEvent.click(eightButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('-1');
    expect(display).toBeInTheDocument();
  });

  test('handles sin function', () => {
    render(<App />);
    const sinButton = screen.getByText('sin');
    fireEvent.click(sinButton);
    const zeroButton = screen.getByText('0');
    fireEvent.click(zeroButton);
    const closeParenButton = screen.getByText(')');
    fireEvent.click(closeParenButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('0');
    expect(display).toBeInTheDocument();
  });

  test('handles cos function', () => {
    render(<App />);
    const cosButton = screen.getByText('cos');
    fireEvent.click(cosButton);
    const zeroButton = screen.getByText('0');
    fireEvent.click(zeroButton);
    const closeParenButton = screen.getByText(')');
    fireEvent.click(closeParenButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('1');
    expect(display).toBeInTheDocument();
  });

  test('handles tan function', () => {
    render(<App />);
    const tanButton = screen.getByText('tan');
    fireEvent.click(tanButton);
    const zeroButton = screen.getByText('0');
    fireEvent.click(zeroButton);
    const closeParenButton = screen.getByText(')');
    fireEvent.click(closeParenButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('0');
    expect(display).toBeInTheDocument();
  });

  test('handles sqrt function', () => {
    render(<App />);
    const sqrtButton = screen.getByText('√');
    fireEvent.click(sqrtButton);
    const nineButton = screen.getByText('9');
    fireEvent.click(nineButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('3');
    expect(display).toBeInTheDocument();
  });

  test('handles power function', () => {
    render(<App />);
    const twoButton = screen.getByText('2');
    fireEvent.click(twoButton);
    const powerButton = screen.getByText('^');
    fireEvent.click(powerButton);
    const threeButton = screen.getByText('3');
    fireEvent.click(threeButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('8');
    expect(display).toBeInTheDocument();
  });

  test('handles error', () => {
    render(<App />);
    const sevenButton = screen.getByText('7');
    fireEvent.click(sevenButton);
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    const equalsButton = screen.getByText('=');
    fireEvent.click(equalsButton);
    const display = screen.getByText('Error');
    expect(display).toBeInTheDocument();
  });
});