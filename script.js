// LA FEMME - JavaScript para la Landing Page

document.addEventListener('DOMContentLoaded', function() {

    // Menú hamburguesa para móvil
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cambio de estilo del header al hacer scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .about-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const interes = document.getElementById('interes').value;

            // Validación básica
            if (!nombre || !email) {
                mostrarMensaje('Por favor completa los campos obligatorios', 'error');
                return;
            }

            if (!validarEmail(email)) {
                mostrarMensaje('Por favor ingresa un email válido', 'error');
                return;
            }

            // Simular envío del formulario
            const botonSubmit = contactForm.querySelector('button[type="submit"]');
            const textoOriginal = botonSubmit.textContent;

            botonSubmit.textContent = 'Enviando...';
            botonSubmit.disabled = true;

            setTimeout(() => {
                // Éxito simulado
                mostrarMensaje('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.', 'success');
                contactForm.reset();
                botonSubmit.textContent = textoOriginal;
                botonSubmit.disabled = false;
            }, 2000);
        });
    }

    // Función para validar email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Función para mostrar mensajes
    function mostrarMensaje(mensaje, tipo) {
        // Eliminar mensajes previos
        const mensajePrevio = document.querySelector('.mensaje-formulario');
        if (mensajePrevio) {
            mensajePrevio.remove();
        }

        // Crear nuevo mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-formulario mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        mensajeDiv.style.cssText = `
            padding: 15px 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-weight: 500;
            text-align: center;
            animation: fadeInDown 0.5s ease;
        `;

        if (tipo === 'success') {
            mensajeDiv.style.background = '#E8F5E9';
            mensajeDiv.style.color = '#2E7D32';
            mensajeDiv.style.border = '1px solid #A5D6A7';
        } else {
            mensajeDiv.style.background = '#FFEBEE';
            mensajeDiv.style.color = '#C62828';
            mensajeDiv.style.border = '1px solid #EF9A9A';
        }

        // Insertar al inicio del formulario
        const formContainer = document.querySelector('.contact-content');
        formContainer.insertBefore(mensajeDiv, contactForm);

        // Eliminar después de 5 segundos
        setTimeout(() => {
            mensajeDiv.remove();
        }, 5000);
    }

    // Agregar animación keyframes dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth reveal para secciones
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Parallax effect para el hero
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / heroHeight);
            }
        });
    }

    // Contador animado para estadísticas (opcional)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    // Inicializar contadores cuando sean visibles
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Si hay sección de estadísticas, observarla
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    console.log('LA FEMME - Sitio web cargado correctamente ✨');
});
