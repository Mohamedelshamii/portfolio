/** @format */

// Toggle Mobile Menu

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});

// Toast function
function showToast(message, color = '#333') {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.backgroundColor = color;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    const form = this;
    const email = form.email.value;

    if (!validateEmail(email)) {
        spinner.classList.add('hidden');
        showToast('❌ Please enter a valid email address', 'crimson');
        return;
    }

    // Send to EmailJS
    emailjs
        .sendForm('service_70cjytg', 'template_npdha5b', form)
        .then(() => {
            // Save to Google Sheets (optional)
            saveToGoogleSheets(form);

            showToast('✅ Message sent successfully!');
            form.reset();
            spinner.classList.add('hidden');
        })
        .catch((error) => {
            showToast('❌ Failed to send. Please try again.', 'crimson');
            console.error(error);
            spinner.classList.add('hidden');
        });
});

// Optional: Save to Google Sheets
function saveToGoogleSheets(form) {
    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
        timestamp: new Date().toLocaleString(),
    };

    fetch('https://sheetdb.io/api/v1/YOUR_SHEETDB_API_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    }).then((res) => {
        if (!res.ok) {
            console.warn('Google Sheets save failed');
        }
    });
}

// Language Switcher
document.getElementById('lang-toggle').addEventListener('click', function () {
    let currentLang = document.documentElement.lang;

    if (currentLang === 'en') {
        document.documentElement.lang = 'ar';
        document.body.setAttribute('dir', 'rtl');
        document.getElementById('lang-toggle').textContent = 'EN';
        changeToArabic();
    } else {
        document.documentElement.lang = 'en';
        document.body.setAttribute('dir', 'ltr');
        document.getElementById('lang-toggle').textContent = 'AR';
        changeToEnglish();
    }
});

function changeToArabic() {
    const textElements = document.querySelectorAll('[data-en]');
    textElements.forEach((element) => {
        element.textContent = element.getAttribute('data-ar');
    });
}

function changeToEnglish() {
    const textElements = document.querySelectorAll('[data-ar]');
    textElements.forEach((element) => {
        element.textContent = element.getAttribute('data-en');
    });
}

// Dark Mode Toggle
let vantaEffect = null;

// Get the saved mode from localStorage
const savedMode = localStorage.getItem('darkMode');
const modeToggle = document.querySelector('.dark-mode-toggle');

// Function to initialize Vanta.js effect
function initVanta(isDark) {
    if (vantaEffect) {
        vantaEffect.destroy();
    }

    vantaEffect = VANTA.WAVES({
        el: '#vanta-background',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: isDark ? 0xffb347 : 0xffb347,
        shininess: isDark ? 0.8 : 0.6,
        waveHeight: isDark ? 30.0 : 20.0,
        backgroundColor: isDark ? 0x2c2c2c : 0xfafafa,
    });
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    // Update Vanta effect based on mode
    initVanta(isDark);

    // Update button icon based on mode
    modeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    modeToggle.classList.toggle('active');

    // Save the mode to localStorage
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// Initialize the page with the saved mode
if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    initVanta(true);
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    modeToggle.classList.add('active');
} else {
    initVanta(false);
    modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Add click event listener to the mode toggle button
modeToggle.addEventListener('click', toggleDarkMode);
