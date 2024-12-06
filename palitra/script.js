document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('color-form');
    const palette = document.getElementById('palette');


    const colors = JSON.parse(localStorage.getItem('colors')) || [];
    colors.forEach(displayColor);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const type = document.getElementById('type').value;
        const code = document.getElementById('code').value.trim();

        if (!validateCode(type, code)) {
            alert('Invalid code format. Please check and try again.');
            return;
        }

        const color = { name, type, code };
        colors.push(color);
        localStorage.setItem('colors', JSON.stringify(colors));
        form.reset();
    });

    function validateCode(type, code) {
        if (type === 'RGB') {
            return /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/.test(code) && code.split(',').every(n => n >= 0 && n <= 255);
        }
        if (type === 'RGBA') {
            return /^(\d{1,3}),(\d{1,3}),(\d{1,3}),(0|1|0\.\d+)$/.test(code) && code.split(',').slice(0, 3).every(n => n >= 0 && n <= 255);
        }
        if (type === 'HEX') {
            return /^#[0-9A-Fa-f]{6}$/.test(code);
        }
        return false;
    }

    function displayColor(color) {
        const div = document.createElement('div');
        div.className = 'color-item';
        div.style.backgroundColor = `rgb(${color.code})`; 
        div.innerHTML = `
            <div>${color.name.toUpperCase()}</div>
            <div>${color.type}</div>
            <div class="color-code">${color.code}</div>
        `;
        palette.appendChild(div);
    }
});
