// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initMenuToggle();
    initSmoothScroll();
    initNavigation();
    initObserver();
    initHeroCarousel();
});

// ============================================
// MENU HAMBURGER
// ============================================

function initMenuToggle() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger) return;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// SCROLL SUAVE
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            
            // Pular se for apenas "#"
            if (href === '#') return;

            event.preventDefault();

            const targetElement = document.querySelector(href);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Compensar navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// NAVEGAÇÃO - DESTAQUE ATIVO
// ============================================

function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// ============================================
// INTERSECTION OBSERVER - REVEAL ELEMENTS
// ============================================

function initObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar skill cards, experience items e outros elementos
    document.querySelectorAll('.skill-card, .experience-item, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// UTILITÁRIOS
// ============================================

// Adicionar classe ativa ao nav link ao clicar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Scroll para o topo ao recarregar a página
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Detectar tema do sistema (dark mode)
// Opcional: Você pode implementar suporte a dark mode aqui
function checkSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Implementar lógica de dark mode se desejar
}

// ============================================
// HERO CAROUSEL
// ============================================

function initHeroCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Função para mostrar slide específico
    function showSlide(index) {
        // Remove classe active de todos os slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Adiciona classe active ao slide atual
        slides[index].classList.add('active');

        currentSlide = index;
    }

    // Função para próximo slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }

    // Inicia o carrossel automático
    let carouselInterval = setInterval(nextSlide, 4000); // Muda a cada 4 segundos

    // Pausa o carrossel quando o mouse está sobre o hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });

        heroSection.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 4000);
        });
    }

    // Inicia com o primeiro slide ativo
    showSlide(0);
}

// ============================================
// PERFORMANCE - LAZY LOAD DE IMAGENS (FUTURO)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log(
    '%c🚀 Bem-vindo ao portfólio de Rafael Fernando (FOSS)! 🚀',
    'font-size: 16px; font-weight: bold; color: #0066ff;'
);
console.log(
    '%cDesenvolvedor Pleno | 6+ anos de experiência | C#, Python, SQL Server',
    'font-size: 12px; color: #00d4ff;'
);
console.log(
    '%cLinkedIn: https://www.linkedin.com/in/rafael-f-o-s-silva-16a912197/',
    'font-size: 12px; color: #666;'
);
