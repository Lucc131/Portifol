const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('aberto');
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('aberto');
    });
});

const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav ul li a');

const observadorNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('ativo'));
            const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            if (link) link.classList.add('ativo');
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => observadorNav.observe(section));

const fadeEls = document.querySelectorAll('.card, .intro-content, .section-title');
fadeEls.forEach(el => el.classList.add('fade-in'));

const observadorFade = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observadorFade.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

fadeEls.forEach(el => observadorFade.observe(el));

const observadorBarras = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.barra-fill').forEach(barra => {
                barra.style.width = barra.dataset.nivel + '%';
            });
            observadorBarras.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.habilidade-grupo').forEach(grupo => {
    observadorBarras.observe(grupo);
});

// Lightbox para ampliar certificados
const certImgs = document.querySelectorAll('#certificacoes .certificacao-img');

if (certImgs.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'cert-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');

    const lightboxImg = document.createElement('img');
    lightboxImg.alt = 'Visualizacao ampliada do certificado';
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    const abrirLightbox = (img) => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Certificado ampliado';
        lightbox.classList.add('aberto');
        document.body.classList.add('lightbox-open');
    };

    const fecharLightbox = () => {
        lightbox.classList.remove('aberto');
        document.body.classList.remove('lightbox-open');
    };

    certImgs.forEach((img) => {
        img.addEventListener('click', () => abrirLightbox(img));
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            fecharLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('aberto')) {
            fecharLightbox();
        }
    });
}
