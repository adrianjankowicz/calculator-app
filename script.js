const ac = document.querySelector('.ac');
const plusMinus = document.querySelector('.plus-minus');
const percent = document.querySelector('.percent');
const divider = document.querySelector('.divider');
const seven = document.querySelector('.seven');
const eight = document.querySelector('.eight');
const nine = document.querySelector('.nine');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
const minus = document.querySelector('.minus');
const multiplier = document.querySelector('.multiplier');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const plus = document.querySelector('.plus');
const zero = document.querySelector('.zero');
const dot = document.querySelector('.dot');
const equal = document.querySelector('.equal');
const remove = document.querySelector('.remove');

const screen = document.querySelector('.result');
const time = document.querySelector('.time');

const updateTime = () => {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  m = checkTime(m);
  time.textContent = h + ':' + m;
  let t = setTimeout(updateTime, 600); // update every minute
};

const updateDisplay = () => {
  screen.textContent = currentValue;
};

const checkTime = i => {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
};
updateTime();

let currentValue = '0';
let previousValue = '';
let currentOperation = null;
let newNumberStarted = false;


const clear = () => {
  currentValue = '0';
  previousValue = '';
  currentOperation = null;
  newNumberStarted = false;
  screen.style.fontSize = '3rem';
  updateDisplay();
  clearSelectedOperation();
};

const calculate = () => {
  let result;
  const previous = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  switch (currentOperation) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      if (current == 0) {
        result = 'Error';
        break;
      }
      result = previous / current;
      break;
    default:
      return;
  }

  if (result.toString().length > 9) {
    screen.style.fontSize = '1.5rem';
  }

  currentValue = parseFloat(result.toFixed(3));
  previousValue = currentValue;
  currentOperation = null;
  newNumberStarted = false;
  updateDisplay();
};



const appendNumber = number => {
  if (newNumberStarted) {
    if (currentValue.length < 12) {
      if (currentValue.length > 5) {
        screen.style.fontSize = '2rem';
      }
      currentValue = currentValue.toString() + number.toString();
    }
  } else {
    currentValue = number.toString();
    newNumberStarted = true;
  }
  updateDisplay();
};

const chooseOperation = operation => {
  if (currentValue === '0' || currentValue === '') return;
  if (previousValue !== '') {
    calculate();
  }

  if (previousValue !== '' && !newNumberStarted) {
    calculate();
  } else {
    previousValue = currentValue;
  }

  clearSelectedOperation();
  currentOperation = operation;
  //previousValue = currentValue;
  switch (operation) {
    case '+':
      operation = 'plus';
      break;
    case '-':
      operation = 'minus';
      break;
    case '*':
      operation = 'multiplier';
      break;
    case '/':
      operation = 'divider';
      break;
    default:
      return;
  }
  document
    .querySelector('.' + operation)
    .classList.add('button-operation-selected');
  newNumberStarted = false;
  updateDisplay();
};

const clearSelectedOperation = () => {
  let buttons = document.querySelectorAll(
    '.divider, .multiplier, .minus, .plus, .equal'
  );
  buttons.forEach(button =>
    button.classList.remove('button-operation-selected')
  );
};

const removeLastDigit = () => {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }
  updateDisplay();
};

const calculatePercentage = () => {
  currentValue = currentValue / 100;
  updateDisplay();
};

const changeSign = () => {
  currentValue = parseFloat(currentValue) * -1;
  updateDisplay();
};

const appendDot = () => {
  if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateDisplay();
};

equal.addEventListener('click', () => {
  calculate();
  clearSelectedOperation();
});

remove.addEventListener('click', removeLastDigit);

ac.addEventListener('click', clear);

equal.addEventListener('click', calculate);

percent.addEventListener('click', calculatePercentage);

plusMinus.addEventListener('click', changeSign);

dot.addEventListener('click', appendDot);

minus.addEventListener('click', () => {
  chooseOperation('-');
});

plus.addEventListener('click', () => {
  chooseOperation('+');
});

multiplier.addEventListener('click', () => {
  chooseOperation('*');
});

divider.addEventListener('click', () => {
  chooseOperation('/');
});

one.addEventListener('click', () => {
  appendNumber(1);
});

two.addEventListener('click', () => {
  appendNumber(2);
});

three.addEventListener('click', () => {
  appendNumber(3);
});

four.addEventListener('click', () => {
  appendNumber(4);
});

five.addEventListener('click', () => {
  appendNumber(5);
});

six.addEventListener('click', () => {
  appendNumber(6);
});

seven.addEventListener('click', () => {
  appendNumber(7);
});

eight.addEventListener('click', () => {
  appendNumber(8);
});

nine.addEventListener('click', () => {
  appendNumber(9);
});

zero.addEventListener('click', () => {
  appendNumber(0);
});


