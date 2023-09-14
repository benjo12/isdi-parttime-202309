const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector('.calculator__display');

const calculate = (n1, operator, n2) => {
  let result = '';

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    if (parseFloat(n2) === 0) {
      result = "ERROR";
    } else {
      result = parseFloat(n1) / parseFloat(n2);
    }
  } else if (operator === 'percentage') {
    result = parseFloat(n1) % parseFloat(n2);
  }

  return result;
}

keys.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    let displayedNum = display.textContent;

    if (!action) {
      if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide' ||
      action === 'percentage'
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue && operator && calculator.dataset.previousKeyType !== 'operator') {
        displayedNum = calculate(firstValue, operator, secondValue);
        display.textContent = displayedNum;
        calculator.dataset.firstValue = displayedNum;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed');
      calculator.dataset.operator = action;
      calculator.dataset.previousKeyType = 'operator';
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (calculator.dataset.previousKeyType === 'operator') {
        display.textContent = '0.';
      }
      calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
      display.textContent = '0';
      delete calculator.dataset.firstValue;
      delete calculator.dataset.operator;
      delete calculator.dataset.previousKeyType;
    }

    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (firstValue) {
        if (calculator.dataset.previousKeyType === 'calculate') {
          firstValue = displayedNum;
          calculator.dataset.secondValue = secondValue;
        }

        display.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.previousKeyType = 'calculate';
    }

    if (action === 'toggle-sign') {
      if (displayedNum !== '0') {
        display.textContent = parseFloat(displayedNum) * -1;
      }

      calculator.dataset.previousKeyType = 'toggle-sign';
    }

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
  }
});
