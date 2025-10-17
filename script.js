// Smooth scroll para los enlaces de navegación
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Obtener el ID de la sección (sin el #)
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// -------------------------------------------
// CÓDIGO PARA EL CARRUSEL SWIPER.JS
// -------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa Swiper después de que el DOM esté completamente cargado
    // Verifica si el elemento .portfolio-swiper existe antes de inicializar Swiper
    if (document.querySelector('.portfolio-swiper')) {
        const portfolioSwiper = new Swiper('.portfolio-swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true, // Para que el carrusel sea infinito

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3, // Mostrar 3 items en pantallas grandes
                    spaceBetween: 30
                }
            }
        });
    } else {
        console.warn("Elemento '.portfolio-swiper' no encontrado, Swiper no se inicializará.");
    }
});
