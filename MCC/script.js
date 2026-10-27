// Upgraded Preloader & Initialization Logic
window.addEventListener('load', () => {
    let progress = 0;
    const bar = document.getElementById('preloader-bar');
    const text = document.getElementById('preloader-text');
    const preloader = document.getElementById('preloader');

    if (bar && text && preloader) {
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 12) + 8;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    setTimeout(() => preloader.style.display = 'none', 800);
                }, 400);
            }
            bar.style.width = progress + '%';
            text.innerText = progress + '%';
        }, 60);
    }
    
    initDatabase();
    renderNotices();
    renderGallery();
});

// Hero Slider Controls
const sliderImages = [
    "http://mahanamacc.sch.lk/images/caro5.jpg",
    "http://mahanamacc.sch.lk/images/caro3.jpg",
    "http://mahanamacc.sch.lk/images/caro4.jpg"
];
let currentSlideIdx = 0;

function nextSlide() {
    const img = document.getElementById('slider-img');
    if (img) {
        currentSlideIdx = (currentSlideIdx + 1) % sliderImages.length;
        img.src = sliderImages[currentSlideIdx];
    }
}

function prevSlide() {
    const img = document.getElementById('slider-img');
    if (img) {
        currentSlideIdx = (currentSlideIdx - 1 + sliderImages.length) % sliderImages.length;
        img.src = sliderImages[currentSlideIdx];
    }
}

if (document.getElementById('slider-img')) {
    setInterval(nextSlide, 5000);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// LocalStorage Database Setup
function initDatabase() {
    if (!localStorage.getItem('m_notices')) {
        localStorage.setItem('m_notices', JSON.stringify([
            { id: 1, title: 'Term Examination Schedule 2026', category: 'Academic', date: '2026-10-28', desc: 'Grade 6 to 13 term examinations start next week.' },
            { id: 2, title: 'Annual Inter-House Sports Meet', category: 'Sports', date: '2026-11-10', desc: 'House practice sessions starting at school grounds.' }
        ]));
    }
    if (!localStorage.getItem('m_gallery')) {
        localStorage.setItem('m_gallery', JSON.stringify([
            { title: 'Buddhist Shrine', url: 'http://mahanamacc.sch.lk/images/gallery/b_shrine.jpg' },
            { title: 'Boys Section', url: 'http://mahanamacc.sch.lk/images/gallery/boys.jpg' },
            { title: 'School Entrance Board', url: 'http://mahanamacc.sch.lk/images/gallery/name.jpg' },
            { title: 'Old Auditorium', url: 'http://mahanamacc.sch.lk/images/gallery/audi_old.jpg' },
            { title: 'Senior School Band', url: 'http://mahanamacc.sch.lk/images/gallery/band.jpg' },
            { title: 'Cultural Dancers', url: 'http://mahanamacc.sch.lk/images/gallery/dancers.jpg' },
            { title: 'Mahinda Statue', url: 'http://mahanamacc.sch.lk/images/gallery/mahinda.jpg' },
            { title: 'School Pathway', url: 'http://mahanamacc.sch.lk/images/gallery/pathway.jpg' },
            { title: 'Swimming Pool Complex', url: 'http://mahanamacc.sch.lk/images/gallery/pool.jpg' },
            { title: 'Students Group', url: 'http://mahanamacc.sch.lk/images/gallery/students.jpg' },
            { title: 'Tech Lab Section', url: 'http://mahanamacc.sch.lk/images/gallery/tech.jpg' },
            { title: 'Girl\'s Cadet Band', url: 'http://mahanamacc.sch.lk/images/gallery/g_band.jpg' },
            { title: 'Aesthetic Unit', url: 'http://mahanamacc.sch.lk/images/gallery/aes.jpg' },
            { title: 'Commerce Section', url: 'http://mahanamacc.sch.lk/images/gallery/comm.jpg' },
            { title: 'Science Lab', url: 'http://mahanamacc.sch.lk/images/gallery/science.jpg' },
            { title: 'School Main Library', url: 'http://mahanamacc.sch.lk/images/gallery/lib.jpg' },
            { title: 'School Grounds / Pavilion', url: 'http://mahanamacc.sch.lk/images/gallery/rane.jpg' }
        ]));
    }
    if (!localStorage.getItem('m_inquiries')) {
        localStorage.setItem('m_inquiries', JSON.stringify([]));
    }
}

function renderNotices() {
    const notices = JSON.parse(localStorage.getItem('m_notices')) || [];
    const container = document.getElementById('notice-container');
    if (!container) return;
    container.innerHTML = notices.map(n => `
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-900">${n.category}</span>
            <h3 class="font-bold text-xl text-slate-900">${n.title}</h3>
            <p class="text-slate-600 text-sm">${n.desc}</p>
        </div>
    `).join('');
}

function renderGallery() {
    const gallery = JSON.parse(localStorage.getItem('m_gallery')) || [];
    const container = document.getElementById('gallery-container');
    if (!container) return;
    container.innerHTML = gallery.map(g => `
        <div onclick="openLightbox('${g.url}')" class="group relative rounded-xl overflow-hidden shadow-md cursor-pointer h-56 bg-slate-100 border border-slate-200">
            <img src="${g.url}" alt="${g.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <h4 class="text-white font-semibold text-sm">${g.title}</h4>
            </div>
        </div>
    `).join('');
}

function openLightbox(url) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    if (modal && img) {
        img.src = url;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    const inquiries = JSON.parse(localStorage.getItem('m_inquiries')) || [];
    inquiries.push({
        name: document.getElementById('c-name').value,
        email: document.getElementById('c-email').value,
        phone: document.getElementById('c-phone').value,
        message: document.getElementById('c-message').value,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('m_inquiries', JSON.stringify(inquiries));
    alert('Your inquiry has been submitted successfully!');
    document.getElementById('contact-form').reset();
}

function handleAdminLogin(e) {
    e.preventDefault();
    if (document.getElementById('admin-pass').value === 'admin123') {
        document.getElementById('admin-login-box').classList.add('hidden');
        document.getElementById('admin-dashboard-box').classList.remove('hidden');
    } else {
        alert('Invalid Passcode! Try admin123');
    }
}

function handleAdminLogout() {
    document.getElementById('admin-login-box').classList.remove('hidden');
    document.getElementById('admin-dashboard-box').classList.add('hidden');
}