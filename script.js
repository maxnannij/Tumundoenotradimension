// Smooth scroll para los enlaces de navegación
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// -------------------------------------------
// ELIMINADO: CÓDIGO PARA EL MODELO 3D FLOTANTE
// -------------------------------------------
/*
import * as THREE from 'https://unpkg.com/three@0.137.5/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.137.5/examples/jsm/loaders/GLTFLoader.js';

const container3D = document.getElementById('product-3d-container');
let scene, camera, renderer, model;

function init3D() {
    if (!container3D) {
        console.warn("Contenedor 3D no encontrado, el modelo 3D no se inicializará.");
        return;
    }

    scene = new THREE.Scene();
    scene.background = null; 

    camera = new THREE.PerspectiveCamera(75, container3D.clientWidth / container3D.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 2); 

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
    renderer.setSize(container3D.clientWidth, container3D.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); 
    container3D.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); 
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); 
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3); 
    pointLight.position.set(-2, 2, 2);
    scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load(
        './models/producto.glb', 
        function (gltf) {
            model = gltf.scene;
            scene.add(model);

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scaleFactor = 1.5 / maxDim; 
            model.scale.set(scaleFactor, scaleFactor, scaleFactor);
            
            model.rotation.y = Math.PI * 0.25; 
            model.rotation.x = Math.PI * 0.05;
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% cargado el modelo 3D');
        },
        function (error) {
            console.error('Error al cargar el modelo 3D:', error);
        }
    );

    window.addEventListener('resize', onWindowResize3D, false);
    window.addEventListener('scroll', onScroll3D, false);

    animate3D();
}

function onWindowResize3D() {
    if (!container3D) return;
    camera.aspect = container3D.clientWidth / container3D.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container3D.clientWidth, container3D.clientHeight);
}

function onScroll3D() {
    if (model) {
        model.rotation.y = window.scrollY * 0.003 + (Math.PI * 0.25); 
        model.rotation.x = window.scrollY * 0.001 + (Math.PI * 0.05);
    }
}

function animate3D() {
    requestAnimationFrame(animate3D);
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init3D);
*/
// -------------------------------------------


// -------------------------------------------
// CÓDIGO PARA EL CARRUSEL SWIPER.JS
// -------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa Swiper después de que el DOM esté completamente cargado
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
});
