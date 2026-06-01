const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const rainInput = document.getElementById('rainTextInput');
const rainBtn = document.getElementById('rainTextBtn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '♡♥★☆✧✿❀0123456789アイウエオカキクケコ';
let rainPool = '送给各位姐姐们祝各位姐姐们六一儿童节快乐永远的好朋友甜甜哒';

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);

const drops = [];
const speeds = [];
const charCache = [];
const isLoveColumn = [];

const pastelHead = ['#ff85b8', '#c9a0ff', '#7ec8e8', '#a8e6cf', '#ffd166', '#ffb7d5'];
const pastelTail = [
    'rgba(255, 133, 184,',
    'rgba(201, 160, 255,',
    'rgba(126, 200, 232,',
    'rgba(168, 230, 207,',
    'rgba(255, 209, 102,',
];

function initColumns(count) {
    for (let i = 0; i < count; i++) {
        drops[i] = Math.random() * -100;
        speeds[i] = Math.random() * 1.8 + 0.8;
        charCache[i] = [];
        isLoveColumn[i] = Math.random() > 0.92;
    }
}

initColumns(columns);

function addToRainPool(text) {
    const trimmed = text.trim().replace(/\s+/g, '');
    if (!trimmed) return false;
    rainPool += trimmed;
    return true;
}

function pickRainChar() {
    return rainPool[Math.floor(Math.random() * rainPool.length)];
}

function submitRainText() {
    if (addToRainPool(rainInput.value)) {
        rainInput.value = '';
        rainInput.placeholder = '飘进雨里啦～再写一句 ♡';
        setTimeout(() => {
            rainInput.placeholder = '写一句给姐姐们的话…';
        }, 2500);
    }
}

rainBtn.addEventListener('click', submitRainText);
rainInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitRainText();
});

function draw() {
    ctx.fillStyle = 'rgba(255, 248, 252, 0.14)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px "Microsoft YaHei", sans-serif';

    for (let i = 0; i < drops.length; i++) {
        const text = isLoveColumn[i] ? pickRainChar() : chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        const colorIdx = i % pastelHead.length;

        if (y > 0 && y < canvas.height + fontSize) {
            if (isLoveColumn[i]) {
                ctx.fillStyle = pastelHead[colorIdx];
                ctx.shadowColor = pastelHead[colorIdx];
                ctx.shadowBlur = 8;
                ctx.fillText(text, i * fontSize, y);
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = '#d4a8c8';
                ctx.fillText(text, i * fontSize, y);
            }

            for (let j = 1; j < 18; j++) {
                const prevY = y - j * fontSize;
                if (prevY > 0) {
                    const alpha = Math.max(0, 1 - j / 18);
                    const tailBase = pastelTail[colorIdx % pastelTail.length];
                    ctx.fillStyle = `${tailBase} ${alpha * 0.7})`;
                    const prevChar = charCache[i][charCache[i].length - j] || pickRainChar();
                    ctx.fillText(prevChar, i * fontSize, prevY);
                }
            }

            charCache[i].push(text);
            if (charCache[i].length > 22) charCache[i].shift();
        }

        drops[i] += speeds[i] * 0.45;

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
            speeds[i] = Math.random() * 1.8 + 0.8;
            charCache[i] = [];
            isLoveColumn[i] = Math.random() > 0.9;
        }
    }
}

setInterval(draw, 38);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = Math.floor(canvas.width / fontSize);
    if (newColumns > columns) {
        for (let i = columns; i < newColumns; i++) {
            drops[i] = Math.random() * -100;
            speeds[i] = Math.random() * 1.8 + 0.8;
            charCache[i] = [];
            isLoveColumn[i] = Math.random() > 0.92;
        }
        columns = newColumns;
    } else if (newColumns < drops.length) {
        drops.length = newColumns;
        speeds.length = newColumns;
        charCache.length = newColumns;
        isLoveColumn.length = newColumns;
        columns = newColumns;
    }
});
