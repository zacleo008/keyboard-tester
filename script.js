document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key');
    const lastKeyElement = document.getElementById('lastKey');
    const keyNameElement = document.getElementById('keyName');
    const keyCodeElement = document.getElementById('keyCode');
    const keyLocationElement = document.getElementById('keyLocation');
    const keysPressedElement = document.getElementById('keysPressed');
    const uniqueKeysElement = document.getElementById('uniqueKeys');
    const keyboardPercentageElement = document.getElementById('keyboardPercentage');
    let keysPressedCount = 0;
    const pressedKeys = new Set();
    const totalKeyCount = keys.length;
    function updateDarkMode() {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    updateDarkMode();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateDarkMode);
    function handleKeyDown(event) {
        event.preventDefault();
        const keyCode = event.code;
        keysPressedCount++;
        lastKeyElement.innerHTML = `<span class="text-primary-color">${event.key}</span>`;
        keyNameElement.textContent = event.key;
        keyCodeElement.textContent = keyCode;
        keyLocationElement.textContent = getKeyLocationText(event.location);
        keysPressedElement.textContent = keysPressedCount;

        const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
            if (!pressedKeys.has(keyCode)) {
                pressedKeys.add(keyCode);
                uniqueKeysElement.textContent = pressedKeys.size;
                updateKeyboardPercentage();
            }
        }
    }
    function handleKeyUp(event) {
        const keyCode = event.code;
        const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    }
    function handleKeyClick(event) {
        const keyCode = this.getAttribute('data-key');
        this.classList.add('active');
        setTimeout(() => {
            this.classList.remove('active');
        }, 200);
        keysPressedCount++;
        keysPressedElement.textContent = keysPressedCount;
        lastKeyElement.innerHTML = `<span class="text-primary-color">${this.textContent}</span>`;
        keyNameElement.textContent = this.textContent;
        keyCodeElement.textContent = keyCode;
        keyLocationElement.textContent = 'Click';
        if (!pressedKeys.has(keyCode)) {
            pressedKeys.add(keyCode);
            uniqueKeysElement.textContent = pressedKeys.size;
            updateKeyboardPercentage();
        }
    }
    function getKeyLocationText(location) {
        switch (location) {
            case 1: return 'Left';
            case 2: return 'Right';
            case 3: return 'Numpad';
            default: return 'Standard';
        }
    }
    function updateKeyboardPercentage() {
        const percentage = Math.round((pressedKeys.size / totalKeyCount) * 100);
        keyboardPercentageElement.textContent = `${percentage}%`;
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    keys.forEach(key => key.addEventListener('click', handleKeyClick));
});