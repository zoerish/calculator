let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;

const display = document.getElementById('display');
const body = document.body;
const themeBtn = document.getElementById('theme-btn');
const colorBtn = document.getElementById('color-btn');
const styleBtn = document.getElementById('style-btn');
const githubBtn = document.getElementById('github-btn');

// Основные функции
function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || resetInput) {
        currentInput = number;
        resetInput = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetInput = true;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev)) return;
    
    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': computation = prev / current; break;
        default: return;
    }
    
    currentInput = computation.toString();
    operation = null;
    resetInput = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function squareRoot() {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
}

function square() {
    currentInput = Math.pow(parseFloat(currentInput), 2).toString();
    updateDisplay();
}

function factorial() {
    let num = parseInt(currentInput);
    if (num < 0) {
        currentInput = 'Error';
    } else {
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        currentInput = result.toString();
    }
    updateDisplay();
}

function toggleInfo() {
    const info = document.querySelector('.info-content');
    info.style.display = info.style.display === 'block' ? 'none' : 'block';
}

// Управление темой
themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const icon = themeBtn.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Смена цвета дисплея
const colors = ['#FD2528', '#4285F4', '#34A853', '#FBBC05', '#EA4335'];
let colorIndex = 0;
colorBtn.addEventListener('click', () => {
    display.style.color = colors[colorIndex = (colorIndex + 1) % colors.length];
});

// Смена стиля кнопок
const styles = ['default', 'rounded', 'flat', '3d'];
let styleIndex = 0;
styleBtn.addEventListener('click', () => {
    body.classList.remove(`style-${styles[styleIndex]}`);
    styleIndex = (styleIndex + 1) % styles.length;
    body.classList.add(`style-${styles[styleIndex]}`);
});

// Кнопка GitHub
githubBtn.addEventListener('click', () => {
    window.open('https://github.com/yourusername/calculator', '_blank');
});

updateDisplay();