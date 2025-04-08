const passwordBox = document.getElementById('password');
const strengthText = document.getElementById('strengthText');
// const length = 12;

function createPassword() {
    const upper = document.getElementById('upper').checked;
    const lower = document.getElementById('lower').checked;
    const num = document.getElementById('num').checked;
    const sym = document.getElementById('sym').checked;
    const len = document.getElementById('len').value;

    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "@#$%^&*()_+~|}{[]></-=";

    let allChars = "";
    if (upper) allChars += upperCase;
    if (lower) allChars += lowerCase;
    if (num) allChars += numbers;
    if (sym) allChars += symbols;

    if (allChars === "") {
        passwordBox.value = "";
        strengthText.innerText = "Select at least one option";
        return;
    }

    let password = "";
    for (let i = 0; i < len; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    passwordBox.value = password;
    updateStrength(password);
    toggleVisibility();
}

function copyPassword(){
    passwordBox.select();
    document.execCommand("copy");
}

function toggleVisibility() {
    const checkbox = document.getElementById('showPass');
    passwordBox.type = checkbox.checked ? "text" : "password";
}


function updateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    let strengthMsg = "";
    let color = "";

    switch (strength) {
        case 1:
        case 2:
            strengthMsg = "Weak";
            color = "red";
            break;
        case 3:
            strengthMsg = "Medium";
            color = "orange";
            break;
        case 4:
            strengthMsg = "Strong";
            color = "lime";
            break;
        default:
            strengthMsg = "Very Weak";
            color = "gray";
    }

    strengthText.innerText = `Strength: ${strengthMsg}`;
    strengthText.style.color = color;
}