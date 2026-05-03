/* =============================================
   MONSOON – IMMERSIVE 3D & SCROLL ANIMATIONS
   SCRIPT.JS
============================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 600);
    });
    document.body.style.overflow = 'hidden';
  }

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const hero = document.querySelector('.hero');
    const obs = new IntersectionObserver(([e]) => {
      navbar.classList.toggle('scrolled', !e.isIntersecting);
    }, { threshold:0 });
    if (hero) obs.observe(hero);
    else navbar.classList.add('scrolled');
  }

  /* ---------- MOBILE MENU ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));
  }

  /* ---------- REVEAL SECTIONS ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -50px 0px' });
    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ---------- RESERVATION FORM ---------- */
  const form = document.getElementById('reservationForm');
  const confirmation = document.getElementById('confirmationMsg');
  if (form && confirmation) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.style.display = 'none';
      confirmation.style.display = 'block';
      confirmation.scrollIntoView({ behavior:'smooth', block:'center' });
      // form.submit(); // uncomment for live
    });
  }

  /* ---------- THREE.JS 3D HERO (only if canvas exists) ---------- */
  const canvas = document.getElementById('hero-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    init3DHero(canvas);
  }
});

/* ---------- 3D HERO SCENE ---------- */
function init3DHero(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.z = 6;

  // Soft ambient + point lights
  scene.add(new THREE.AmbientLight(0x443322, 1.2));
  const light1 = new THREE.PointLight(0xc9a24d, 1, 10);
  light1.position.set(2, 2, 3);
  scene.add(light1);
  const light2 = new THREE.PointLight(0x336666, 0.8, 10);
  light2.position.set(-2, -1, 2);
  scene.add(light2);

  // Group to hold rotating elements
  const group = new THREE.Group();
  scene.add(group);

  // Central floating lantern (torus knot)
  const geometry = new THREE.TorusKnotGeometry(0.6, 0.15, 100, 16);
  const material = new THREE.MeshStandardMaterial({ color:0xc9a24d, roughness:0.3, metalness:0.7 });
  const knot = new THREE.Mesh(geometry, material);
  group.add(knot);

  // Surrounding rings (chopstick motifs)
  const ringGeo = new THREE.TorusGeometry(0.8, 0.05, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({ color:0x889988, roughness:0.4, metalness:0.6 });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI/2;
  group.add(ring1);
  const ring2 = new THREE.Mesh(ringGeo, ringMat);
  ring2.rotation.z = Math.PI/2;
  group.add(ring2);
  const ring3 = new THREE.Mesh(ringGeo, ringMat);
  ring3.rotation.y = Math.PI/2;
  group.add(ring3);

  // Floating particles (steam/rain)
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 400;
  const posArray = new Float32Array(particleCount*3);
  for (let i=0; i<particleCount*3; i+=3) {
    posArray[i] = (Math.random()-0.5)*5;
    posArray[i+1] = (Math.random()-0.5)*4 + 1;
    posArray[i+2] = (Math.random()-0.5)*3;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({ size:0.03, color:0xccaa66, blending:THREE.AdditiveBlending, depthWrite:false });
  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  // Scroll-driven rotation
  let targetRotY = 0, targetRotX = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    targetRotY = scrollY * 0.002;
    targetRotX = scrollY * 0.001;
  }, { passive:true });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Smooth rotation
    group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
    particles.rotation.y += 0.0002;
    particles.rotation.x += 0.0001;
    renderer.render(scene, camera);
  }
  animate();
}
