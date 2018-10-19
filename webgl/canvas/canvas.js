window.onload = function() {
	let width = window.innerWidth,
		height = window.innerHeight,
		canvas = document.getElementById('canvas');

		canvas.setAttribute('width', width);
		canvas.setAttribute('height', height);

	let ball = {
		rotationX: 0,
		rotationY: 0,
		rotationZ: 0,
		positionX: 0,
		positionY: 0,
		cameraPositionZ: 1000
	};

	let gui = new dat.GUI();
	gui.add(ball, 'rotationX').min(-0.2).max(0.2).step(0.001);
	gui.add(ball, 'rotationY').min(-0.2).max(0.2).step(0.001);
	gui.add(ball, 'rotationZ').min(-0.2).max(0.2).step(0.001);
	gui.add(ball, 'positionX').min(-10).max(10).step(0.1);
	gui.add(ball, 'positionY').min(-10).max(10).step(0.1);
	gui.add(ball, 'cameraPositionZ').min(-1000).max(4000).step(10);

	let renderer = new THREE.WebGLRenderer({canvas:canvas});
	renderer.setClearColor(0x000000);

	let scene = new THREE.Scene();

	let camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
	camera.position.z = 1000;

	let light = new THREE.AmbientLight(0xffffff);
	scene.add(light);

	let geometry = new THREE.SphereGeometry(200, 12, 12),
		material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});

	for(let i = 0; i < geometry.faces.length; i++) {
		geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
	}

	let mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	let cubeGeometry = new THREE.CubeGeometry(300, 300, 300),
		loader = new THREE.ImageLoader();

	let cubeMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('../img/cebe-texture.jpg'), overdraw: true}),
		cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.x = 800;
	cube.position.z = -700;
	scene.add(cube);

	let cylinderGeometry = new THREE.CylinderGeometry(150, 150, 500),
		cylinderTexture = new THREE.MeshNormalMaterial(10, 10),
		cylinder = new THREE.Mesh(cylinderGeometry, cylinderTexture);
	cylinder.position.x = -800;
	cylinder.position.z = -700;
	scene.add(cylinder);

	let particleObj = new THREE.ParticleSystem(geometry, material);
	particleObj.position.set(0, 50, 0);
	particleObj.dynamic = true;
	particleObj.sortPartiles = true;
	scene.add(particleObj);

	let controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minPolarAngle = Math.PI / 2;
	controls.maxPolarAngle = Math.PI / 2;

	function loop() {
		mesh.rotation.x += ball.rotationX;
		mesh.rotation.y += ball.rotationY;
		mesh.rotation.z += ball.rotationZ;
		mesh.position.x += ball.positionX;
		mesh.position.y += ball.positionY;

		cube.rotation.y += 180/Math.PI*0.0001;
		cube.rotation.x += 180/Math.PI*0.0001;

		cylinder.rotation.y += 180/Math.PI*0.0001;
		cylinder.rotation.x += 180/Math.PI*0.0001;

		camera.position.z = ball.cameraPositionZ;

		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(function() {loop();});
	};

	loop();

};