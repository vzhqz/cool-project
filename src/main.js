import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'


const spinBtn = document.getElementById("spinBtn");
const gridBtn = document.getElementById("gridBtn");
let isSpinning = true;
let gridShowing = false;


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(40);
camera.position.setY(40);
camera.position.setX(0);

renderer.render(scene, camera);

const monkeyTexture = new THREE.TextureLoader().load('monkey.jpg');
const geometry = new THREE.BoxGeometry(20, 20, 20, 20);
const material = new THREE.MeshBasicMaterial({map: monkeyTexture});
const monkey = new THREE.Mesh(geometry, material);
scene.add(monkey);


const ambientLight = new THREE.AmbientLight(0xffffff, 10);

scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

spinBtn.addEventListener("click", () => {
    isSpinning = !isSpinning;
    spinBtn.textContent = isSpinning ? "Stop Spinning" : "Start Spinning";
});

const gridHelper = new THREE.GridHelper(200, 50, 0x000, 0xffffff);
gridShowing = true;
scene.add(gridHelper);

gridBtn.addEventListener("click", () => {
    gridShowing = !gridShowing;
    gridBtn.textContent = gridShowing ? "Hide Grid" : "Show Grid";

    if(gridShowing) {
        scene.add(gridHelper);
    }
    else {
        scene.remove(gridHelper);    
    }
});

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 'rgb(255, 255, 255)'});
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