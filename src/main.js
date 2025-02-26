import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const button = document.querySelector("button");
let isSpinning = true;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const monkeyTexture = new THREE.TextureLoader().load('monkey.png');
const geometry = new THREE.BoxGeometry(20, 20, 20, 20);
const material = new THREE.MeshBasicMaterial({map: monkeyTexture});
const monkey = new THREE.Mesh(geometry, material);
scene.add(monkey);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 10);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50, 0x000, 0xffffff);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

button.addEventListener("click", () => {
    isSpinning = !isSpinning;
    button.textContent = isSpinning ? "Stop Spinning" : "Start Spinning";
});

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 'rgb(197, 65, 230)'});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);

    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function animate() {
    requestAnimationFrame(animate);

    if(isSpinning) {
        monkey.rotation.x += 0.01;
        monkey.rotation.y += 0.05;
        monkey.rotation.z += 0.01;
    }

    controls.update();

    renderer.render(scene, camera);
}

animate();