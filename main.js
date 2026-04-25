// Mobile Menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu on link click
document.querySelectorAll('.nav__list a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const sectionPosition = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: sectionPosition - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations (Intersection Observer)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay * 1000);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Parallax for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatItems = document.querySelectorAll('.float-item, .hero__floating-badge');
    
    floatItems.forEach((item, index) => {
        const speed = 0.1 + (index * 0.05);
        item.style.transform = `translateY(${scrolled * speed}px)`;
    });
});