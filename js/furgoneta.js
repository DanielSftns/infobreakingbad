import {OrbitControls} from './OrbitControls.js'
import {stateFocusSections} from './app.js'
const area = document.querySelector('.furgo')
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 40, area.offsetWidth / area.offsetHeight, 1, 5000 )
camera.position.z = 2.5

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
renderer.setSize( area.offsetWidth, area.offsetHeight )
renderer.setClearColor(0x4d4d4d,0)


const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 2.5
controls.maxDistance = 5
controls.enableKeys = false

const AmbientLight = new THREE.AmbientLight(0x404040,4)
scene.add(AmbientLight)

const directionalLight = new THREE.DirectionalLight(0xd9d9d9,2)
directionalLight.position.set(0,0.1,10)
// directionalLight.castShadow = true
// scene.add(directionalLight)

let light
light = new THREE.PointLight(0xf2f2f2,.8)
light.position.set(0,300,500)
scene.add(light)

light = new THREE.PointLight(0xf2f2f2,.8)
light.position.set(500,100,0)
scene.add(light)

light = new THREE.PointLight(0xf2f2f2,.8)
light.position.set(0,100,-500)
scene.add(light)

light = new THREE.PointLight(0xf2f2f2,.8)
light.position.set(-500,300,0)
scene.add(light)

area.appendChild(renderer.domElement)

let loader = new THREE.GLTFLoader()
let car
loader.load('furgoneta_model/scene.gltf', (gltf)=>{
	car = gltf.scene.children[0]
	car.scale.set(0.8,0.8,0.8)
	car.rotation.z = 1
	scene.add(gltf.scene)
	animate()
})

export function animate() {
	if(typeof car == 'undefined') return
	controls.update()
	car.rotation.z += 0.003
	renderer.render(scene, camera)
	if(stateFocusSections.focusEpisodes){
		requestAnimationFrame(animate)
	}
}
