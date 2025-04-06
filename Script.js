const eye = document.getElementById('eye');
const iris = document.getElementById('iris');
const pupil = document.getElementById('pupil');
const inp = document.getElementById('password');
const eyelash = document.querySelector('.eyelash:nth-child(1)');
const eyelash2 = document.querySelector('.eyelash:nth-child(5)');

let actualText = "";

const randomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return chars[Math.floor(Math.random() * chars.length)];
};

function animateWithReveal(finalText, isPasswordType, callback) {
    let current = Array.from(inp.value);
    let reveal = Array.from(finalText);
    let step = 0;

    const interval = setInterval(() => {
        let output = current.map((char, idx) => {
            if (idx < step) return reveal[idx];
            return randomChar();
        }).join('');

        inp.value = output;
        step++;

        if (step > reveal.length) {
            clearInterval(interval);
            inp.type = isPasswordType ? 'password' : 'text';
            inp.value = finalText;
            callback && callback();
        }
    }, 60);
}

inp.addEventListener('input', () => {
    actualText = inp.value;
});

document.addEventListener('mousemove', (event) => {
    const eyeRect = eye.getBoundingClientRect();
    const centerX = eyeRect.left + eyeRect.width / 2;
    const centerY = eyeRect.top + eyeRect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const angle = Math.atan2(deltaY, deltaX);
    const moveX = Math.cos(angle) * 30;
    const moveY = Math.sin(angle) * 15;

    iris.style.transform = `translate(${moveX + -15}px, ${moveY + -15}px)`;
});

eye.addEventListener("click", () => {

    if (eye.classList.contains("closed")) {
        eye.classList.remove("closed");
        eyelash.classList.remove("eyelash_closes");
        eyelash2.classList.remove("eyelash_closes");

        inp.type = "text";
        animateWithReveal(actualText, false);
    } else {
        eye.classList.add("closed");
        eyelash.classList.add("eyelash_closes");
        eyelash2.classList.add("eyelash_closes");

        inp.type = "text";
        animateWithReveal("*".repeat(actualText.length), true, () => {
            inp.type = "password";
        });
    }
});