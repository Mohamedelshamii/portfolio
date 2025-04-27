/** @format */

// Initialize VANTA background immediately
const vantaEffect = VANTA.WAVES({
    el: '#vanta-background',
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xffb347, // Warm yellow color
    shininess: 0.0,
    waveHeight: 20.0,
    waveSpeed: 0.75,
    zoom: 0.65,
    backgroundColor: 0xfff8e7, // Warm background always
});

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

// Dark Mode Toggle
const savedMode = localStorage.getItem('darkMode');
const modeToggle = document.querySelector('.dark-mode-toggle');

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    modeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// Initialize dark mode from saved preference
if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Add click event listener to the mode toggle button
modeToggle.addEventListener('click', toggleDarkMode);

// Language switching functionality
function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'en' ? 'ar' : 'en';

    // Update HTML lang attribute
    document.documentElement.lang = newLang;

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach((element) => {
        // Skip skill names
        if (element.closest('.skill-info h4')) return;

        const enText = element.getAttribute('data-en');
        const arText = element.getAttribute('data-ar');
        element.textContent = newLang === 'en' ? enText : arText;
    });

    // Update placeholders
    document
        .querySelectorAll('input[data-ar-placeholder], textarea[data-ar-placeholder]')
        .forEach((element) => {
            const enPlaceholder = element.getAttribute('data-en-placeholder');
            const arPlaceholder = element.getAttribute('data-ar-placeholder');
            element.setAttribute('placeholder', newLang === 'en' ? enPlaceholder : arPlaceholder);
        });

    // Update link titles
    document.querySelectorAll('[data-ar-title]').forEach((element) => {
        const enTitle = element.getAttribute('title');
        const arTitle = element.getAttribute('data-ar-title');
        element.setAttribute('title', newLang === 'en' ? enTitle : arTitle);
    });

    // Update language toggle button text
    const langToggle = document.querySelector('#lang-toggle span');
    const toggleEnText = langToggle.getAttribute('data-en');
    const toggleArText = langToggle.getAttribute('data-ar');
    langToggle.textContent = newLang === 'en' ? toggleEnText : toggleArText;

    // Save language preference
    localStorage.setItem('preferredLanguage', newLang);
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    document.documentElement.lang = savedLang;

    // Apply the saved language
    document.querySelectorAll('[data-en]').forEach((element) => {
        if (element.closest('.skill-info h4')) return;
        const enText = element.getAttribute('data-en');
        const arText = element.getAttribute('data-ar');
        element.textContent = savedLang === 'en' ? enText : arText;
    });

    // Apply saved language to placeholders
    document
        .querySelectorAll('input[data-ar-placeholder], textarea[data-ar-placeholder]')
        .forEach((element) => {
            const enPlaceholder = element.getAttribute('data-en-placeholder');
            const arPlaceholder = element.getAttribute('data-ar-placeholder');
            element.setAttribute('placeholder', savedLang === 'en' ? enPlaceholder : arPlaceholder);
        });

    // Apply saved language to titles
    document.querySelectorAll('[data-ar-title]').forEach((element) => {
        const enTitle = element.getAttribute('title');
        const arTitle = element.getAttribute('data-ar-title');
        element.setAttribute('title', savedLang === 'en' ? enTitle : arTitle);
    });

    // Set language toggle button text
    const langToggle = document.querySelector('#lang-toggle span');
    const toggleEnText = langToggle.getAttribute('data-en');
    const toggleArText = langToggle.getAttribute('data-ar');
    langToggle.textContent = savedLang === 'en' ? toggleEnText : toggleArText;
});

// Add click event listener to language toggle button
document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);

// Project Details Data
const projectDetails = {
    'prayer-project': {
        title: {
            en: 'Prayer Project',
            ar: 'مشروع مواقيت الصلاة',
        },
        description: {
            en: 'A beautiful and modern web application for displaying prayer times in different Egyptian cities. The application features an Islamic design with a user-friendly interface, making it easy for users to check prayer times for their location.',
            ar: 'تطبيق ويب جميل وعصري لعرض مواقيت الصلاة في مختلف المدن المصرية. يتميز التطبيق بتصميم إسلامي جذاب وواجهة مستخدم سهلة الاستخدام، مما يسهل على المستخدمين التحقق من مواقيت الصلاة لموقعهم.',
        },
        features: {
            en: [
                'Display prayer times for five daily prayers',
                'Support for multiple Egyptian cities',
                'Beautiful Islamic design and interface',
                'Responsive layout for all devices',
                'Easy city selection and navigation',
                'Automatic date updates',
            ],
            ar: [
                'عرض مواقيت الصلوات الخمس',
                'دعم لعدة مدن مصرية',
                'تصميم إسلامي جميل وواجهة سهلة',
                'تصميم متجاوب لجميع الأجهزة',
                'سهولة اختيار المدينة والتنقل',
                'تحديث تلقائي للتاريخ',
            ],
        },
        technologies: [
            'devicon-html5-plain',
            'devicon-css3-plain',
            'devicon-javascript-plain',
            'devicon-react-original',
        ],
    },
    'to-do-list': {
        title: {
            en: 'To Do List',
            ar: 'قائمة المهام',
        },
        description: {
            en: 'A modern and simple To Do List web app. Add, manage, and track your daily tasks with a clean and intuitive interface. Built with HTML, CSS, and JavaScript.',
            ar: 'تطبيق ويب حديث وبسيط لقائمة المهام. أضف، نظم، وتابع مهامك اليومية من خلال واجهة نظيفة وسهلة الاستخدام. تم بناؤه باستخدام HTML وCSS وJavaScript.',
        },
        features: {
            en: [
                'Add, edit, and delete tasks',
                'Mark tasks as completed',
                'Responsive and clean UI',
                'Local storage support',
            ],
            ar: [
                'إضافة وتعديل وحذف المهام',
                'وضع علامة على المهام المنجزة',
                'واجهة مستخدم نظيفة ومتجاوبة',
                'دعم التخزين المحلي',
            ],
        },
        technologies: ['devicon-html5-plain', 'devicon-css3-plain', 'devicon-javascript-plain'],
    },
    'resto-restaurant': {
        title: {
            en: 'Resto Restaurant',
            ar: 'مطعم ريستو',
        },
        description: {
            en: 'Resto is a modern and elegant restaurant website that provides an immersive dining experience for customers. The website features a sleek design with smooth animations and intuitive navigation. It includes a comprehensive menu system, real-time table reservation functionality, and a stunning food gallery. The project demonstrates modern web development practices with responsive design and interactive user interfaces.',
            ar: 'ريستو هو موقع ويب عصري وأنيق للمطعم يوفر تجربة طعام غامرة للعملاء. يتميز الموقع بتصميم أنيق مع حركات سلسة وتنقل بديهي. يتضمن نظام قائمة طعام شامل، وظيفة حجز طاولات فورية، ومعرض صور طعام مذهل. يوضح المشروع ممارسات تطوير الويب الحديثة مع تصميم متجاوب وواجهات مستخدم تفاعلية.',
        },
        features: {
            en: [
                'Interactive menu with categories and descriptions',
                'Real-time table reservation system with availability check',
                'Stunning food gallery with lightbox effect',
                'Responsive design for all devices',
                'Contact form with validation',
                'Smooth animations and transitions',
                'Multi-language support',
                'Online ordering system',
                'Customer reviews section',
                'Social media integration',
            ],
            ar: [
                'قائمة طعام تفاعلية مع الفئات والأوصاف',
                'نظام حجز طاولات فوري مع التحقق من التوفر',
                'معرض صور طعام مذهل مع تأثير الإضاءة',
                'تصميم متجاوب لجميع الأجهزة',
                'نموذج اتصال مع التحقق',
                'حركات وانتقالات سلسة',
                'دعم تعدد اللغات',
                'نظام طلب عبر الإنترنت',
                'قسم مراجعات العملاء',
                'تكامل مع وسائل التواصل الاجتماعي',
            ],
        },
        technologies: [
            'devicon-html5-plain',
            'devicon-css3-plain',
            'devicon-javascript-plain',
            'devicon-bootstrap-plain',
            'devicon-jquery-plain',
            'devicon-git-plain',
        ],
    },
};

// Modal functionality
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const projectMoreButtons = document.querySelectorAll('.project-more');

function openModal(projectId) {
    const project = projectDetails[projectId];
    const currentLang = document.documentElement.lang;

    // Get the project card and its custom image if available
    let imageSrc = `Img/${projectId === 'prayer-project' ? 'Prayer_Project' : projectId}.png`;
    const projectCard = Array.from(document.querySelectorAll('.project-card')).find((card) => {
        const img = card.querySelector('img');
        return img && img.alt.toLowerCase().replace(/\s+/g, '-') === projectId;
    });
    if (projectCard) {
        const moreBtn = projectCard.querySelector('.project-more');
        if (moreBtn && moreBtn.hasAttribute('data-modal-image')) {
            imageSrc = moreBtn.getAttribute('data-modal-image');
        }
    }

    // Set modal content
    document.getElementById('modalTitle').textContent = project.title[currentLang];
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalDescription').textContent = project.description[currentLang];

    // Set features
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    project.features[currentLang].forEach((feature) => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Set technologies
    const techStack = document.getElementById('modalTech');
    techStack.innerHTML = '';
    project.technologies.forEach((tech) => {
        const i = document.createElement('i');
        i.className = tech;
        techStack.appendChild(i);
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
closeModal.addEventListener('click', closeModalHandler);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalHandler();
    }
});

projectMoreButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectCard = button.closest('.project-card');
        const projectId = projectCard.querySelector('img').alt.toLowerCase().replace(/\s+/g, '-');
        openModal(projectId);
    });
});

// Update modal content when language changes
document.getElementById('lang-toggle').addEventListener('click', () => {
    if (modal.style.display === 'block') {
        const currentLang = document.documentElement.lang;
        const projectId = document
            .getElementById('modalImage')
            .src.split('/')
            .pop()
            .replace('.png', '');
        const project = projectDetails[projectId];

        document.getElementById('modalTitle').textContent = project.title[currentLang];
        document.getElementById('modalDescription').textContent = project.description[currentLang];

        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = '';
        project.features[currentLang].forEach((feature) => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }
});
