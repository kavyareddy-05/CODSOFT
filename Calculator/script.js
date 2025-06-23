const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultShown = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'AC') {
      currentInput = '';
      display.value = '';
    } else if (value === 'DEL') {
      currentInput = currentInput.slice(0, -1); // Remove last character
      display.value = currentInput;
    } else if (value === '=') {
      try {
        currentInput = eval(currentInput).toString(); // Simple but unsafe in real apps
        display.value = currentInput;
        resultShown = true;
      } catch {
        display.value = 'Error';
        currentInput = '';
      }
    } else {
      if (resultShown) {
        currentInput = '';
        resultShown = false;
      }
      currentInput += value;
      display.value = currentInput;
    }
  });
});
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key >= '0' && key <= '9' || key === '.' || ['+', '-', '*', '/'].includes(key)) {
    if (resultShown) {
      currentInput = '';
      resultShown = false;
    }
    currentInput += key;
    display.value = currentInput;
  } else if (key === 'Enter') {
    try {
      currentInput = eval(currentInput).toString();
      display.value = currentInput;
      resultShown = true;
    } catch {
      display.value = 'Error';
      currentInput = '';
    }
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (key === 'Escape') {
    currentInput = '';
    display.value = '';
  }
});

