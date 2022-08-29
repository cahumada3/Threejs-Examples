import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// DEBUG CONTROLS
const gui = new dat.GUI()

// CANVAS
const canvas = document.querySelector('canvas.webgl')

// SCENE
const scene = new THREE.Scene()

// OBJECT
// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc)
const geometry = new THREE.TorusGeometry( .8, .2, 16, 100 );


// MATERIALS
// lost of different properties
const material = new THREE.MeshStandardMaterial()
//material.metalness = 0.5
//material.roughness = 0.2
material.color = new THREE.Color(0xFF0000)

// MESH
const torus = new THREE.Mesh(geometry,material)
scene.add(torus)

// Add gui control
//gui.add(material, 'wireframe')

// LIGHTS
// PointLight( color, intensity)
// PointLight is light that gets emmitted from a single point in all directions
// kinda replicates the light emitted from a lightbulb
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight)

// LIGHT 2 RED
// const pointLight2 = new THREE.PointLight(0xff0000, 2)
// pointLight2.position.set(-2.4,1.3,-0.9)
// pointLight2.intensity = 10

// scene.add(pointLight2)

// const light2 = gui.addFolder('Light 2')

//when you specify min and max you get the slider option 
// light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.1)
// light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.1)
// light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.1)
// light2.add(pointLight2, 'intensity').min(0).max(10).step(0.1)

//Now lets say we wanna be able to change the color
// const light2Color = {
//     color: 0xff0000
// }

//creates a color pallet for pointLight2
//dat.GUI will notify THREEjs to change the pointLight2 color

// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight2.color.set(light2Color.color)
//     })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)

// LIGHT 3 BLUE
// const pointLight3 = new THREE.PointLight(0x3ef7, 2)
// pointLight3.position.set(2,-1.9,0.6)
// pointLight3.intensity = 7.5

// scene.add(pointLight3)

// const light3 = gui.addFolder('Light 3')

// when you specify min and max you get the slider option 
// light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.1)
// light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.1)
// light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.1)
// light3.add(pointLight3, 'intensity').min(0).max(10).step(0.1)

// const light3Color = {
//     color: 0x3ef7
// }

// creates a color pallet for pointLight3
// dat.GUI will notify THREEjs to change the pointLight3 color

// light3.addColor(light3Color, 'color')
//     .onChange(() => {
//         pointLight3.color.set(light3Color.color)
//     })

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)

// SIZES
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resizes the browser
// when we resize the browser we have to notify threejs so that it knows how
// wide the canvas element should be
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// CAMERA
// Designed to mimic the way the human eye sees. 
// Most common projection mode for rendering a 3D scene.
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// CONTROLS
 //const controls = new OrbitControls(camera, canvas)
 //controls.enableDamping = true

// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ANIMATION
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

// depending on the frame rate it'll run the tick function over an over
// clock keeps track of time
const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    torus.rotation.y = .5 * elapsedTime
    torus.rotation.x += .05 * (targetY - torus.rotation.x)
    torus.rotation.y += .5 * (targetX - torus.rotation.y)
    torus.position.z += -.05 * (targetY - torus.rotation.x)

    // Update Orbital Controls
     //controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()