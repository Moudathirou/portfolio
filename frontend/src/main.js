document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const btn = document.querySelector('button[aria-controls="mobile-menu"]');
    const menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.className = 'md:hidden hidden bg-dark-bg/95 backdrop-blur-xl absolute top-20 left-0 w-full border-b border-white/5 p-4';
    // Safe Menu Construction
    const menuLinks = [
        { name: 'À Propos', href: '#about' },
        { name: 'Expertise', href: '#expertise' },
        { name: 'Services', href: '#services' },
        { name: 'Projets', href: '#projects' },
        { name: 'Me Contacter', href: '#contact', special: true }
    ];

    const menuContainer = document.createElement('div');
    menuContainer.className = 'px-2 pt-2 pb-3 space-y-1 sm:px-3';

    menuLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.name;
        if (link.special) {
            a.className = 'block px-3 py-2 rounded-md text-base font-medium text-secondary hover:bg-secondary/10';
        } else {
            a.className = 'block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10';
        }
        menuContainer.appendChild(a);
    });

    menu.appendChild(menuContainer);
    document.querySelector('nav').appendChild(menu);

    btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('hidden');
    });

    // GSAP Animations Initialization
    gsap.registerPlugin(ScrollTrigger);

    // Fade up animations
    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 20) {
            nav.classList.add('shadow-lg');
            nav.classList.replace('bg-dark-bg/80', 'bg-dark-bg/95');
        } else {
            nav.classList.remove('shadow-lg');
            nav.classList.replace('bg-dark-bg/95', 'bg-dark-bg/80');
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            // Basic Frontend Validation
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Loading State
            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');

            try {
                // Use relative URL now that Frontend is served by Backend
                const apiUrl = '/api/contact';


                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    // Success
                    alert(result.message || 'Message envoyé avec succès !');
                    contactForm.reset();
                } else {
                    // Error
                    alert('Erreur: ' + (result.detail || 'Une erreur est survenue.'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Impossible de contacter le serveur. Vérifiez votre connexion.');
            } finally {
                // Reset State
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            }
        });
    }
});
