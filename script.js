import * as THREE from 'https://unpkg.com/three@0.137.5/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.137.5/examples/jsm/loaders/GLTFLoader.js';

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
// CÓDIGO PARA EL MODELO 3D FLOTANTE
// -------------------------------------------

const container3D = document.getElementById('product-3d-container');
let scene, camera, renderer, model;

// Función para inicializar la escena 3D
function init3D() {
    if (!container3D) {
        console.warn("Contenedor 3D no encontrado, el modelo 3D no se inicializará.");
        return;
    }

    // 1. Escena
    scene = new THREE.Scene();
    // Establece el fondo como transparente si el contenedor tiene su propio fondo o quieres que sea transparente
    scene.background = null; 

    // 2. Cámara
    // Ajusta la posición Z para que el modelo se vea bien
    camera = new THREE.PerspectiveCamera(75, container3D.clientWidth / container3D.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 2); // Puedes ajustar estos valores (x, y, z)

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true es crucial para fondo transparente
    renderer.setSize(container3D.clientWidth, container3D.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Mejora la calidad en pantallas de alta densidad
    container3D.appendChild(renderer.domElement);

    // 4. Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Luz ambiental suave
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Luz direccional
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3); // Luz puntual para destacar
    pointLight.position.set(-2, 2, 2);
    scene.add(pointLight);

    // 5. Cargar Modelo GLTF
    const loader = new GLTFLoader();
    loader.load(
        './models/producto.glb', // <--- ¡IMPORTANTE! Cambia esto a la ruta de tu modelo 3D
        function (gltf) {
            model = gltf.scene;
            scene.add(model);

            // Ajusta la escala y la posición de tu modelo si es necesario.
            // Esto es crucial para que se vea correctamente.
            // Ejemplo: model.scale.set(0.5, 0.5, 0.5);
            // Ejemplo: model.position.y = -0.5;

            // Centra el modelo en el origen si es necesario (depende de cómo se exportó)
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            // Si el modelo es muy grande, ajústalo
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scaleFactor = 1.5 / maxDim; // Escala para que el modelo quepa bien en la vista
            model.scale.set(scaleFactor, scaleFactor, scaleFactor);
            
            // Opcional: Rotación inicial para darle un buen ángulo
            model.rotation.y = Math.PI * 0.25; 
            model.rotation.x = Math.PI * 0.05;
        },
        // Función de progreso (opcional)
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% cargado el modelo 3D');
        },
        // Función de error
        function (error) {
            console.error('Error al cargar el modelo 3D:', error);
        }
    );

    // 6. Manejar redimensionamiento y scroll
    window.addEventListener('resize', onWindowResize3D, false);
    window.addEventListener('scroll', onScroll3D, false);

    // Iniciar el bucle de animación
    animate3D();
}

// Función para ajustar el tamaño del renderer y la cámara al redimensionar la ventana
function onWindowResize3D() {
    if (!container3D) return;
    camera.aspect = container3D.clientWidth / container3D.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container3D.clientWidth, container3D.clientHeight);
}

// Función para rotar el modelo al hacer scroll
function onScroll3D() {
    if (model) {
        // La velocidad de rotación se ajusta multiplicando window.scrollY por un factor
        // Valores más pequeños = rotación más lenta
        model.rotation.y = window.scrollY * 0.003 + (Math.PI * 0.25); // Mantén la rotación inicial y añade scroll
        model.rotation.x = window.scrollY * 0.001 + (Math.PI * 0.05);
    }
}

// Bucle de animación (para renderizar la escena constantemente)
function animate3D() {
    requestAnimationFrame(animate3D);
    renderer.render(scene, camera);
}

// Llama a la función de inicialización 3D cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', init3D);
