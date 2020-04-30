let audio, audioContext, audioSrc;
let analyser, analyserBufferLength;

let w;
let h;

let center2D;

let btStart;
let canvas;
let context;

let imageData;
let data;
let musicGenres;

let mouseActive = false;
let mouseDown = false;
let mousePos = {
    x: 0, y: 0
};

let fov = 250;

const speed = 0.25;
const speedMin = speed;
const speedMax = 2;

let particles = [];
let particlesSky = [];
let particleDistanceTop = 10;


function initAnimation() {
  canvas = document.createElement('canvas');
  canvas.addEventListener('mousedown', mouseDownHandler, false);
  canvas.addEventListener('mousemove', mouseMoveHandler, false);
  canvas.addEventListener('mouseenter', mouseEnterHandler, false); 
  canvas.addEventListener('mouseleave', mouseLeaveHandler, false); 

  document.body.appendChild(canvas);

  context = canvas.getContext('2d');

  window.addEventListener('resize', onResize);
  onResize();

  addParticles(particles, 1);
  addParticles(particlesSky, -1);
  
  render();
  render();

  context.putImageData(imageData, 0, 0);
};


function userStart() {
  audio = null;
  analyser = null;

  audioSetup();
  animate();
};


function audioSetup() {
  audio = new Audio();
  audio.src = 'http://nkunited.de/ExternalImages/jsfiddle/audio/Atlantis-Audionautix-_192kbit_AAC_.mp3';
  audio.controls = false;
  audio.loop = true;
  audio.autoplay = true;
  audio.crossOrigin = 'anonymous';

  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  analyser = audioContext.createAnalyser();
  analyser.connect(audioContext.destination);
  analyser.smoothingTimeConstant = 0.75;

  analyser.fftSize = 512 * 32;
  analyserBufferLength = analyser.frequencyBinCount;

  audioSrc = audioContext.createMediaElementSource(audio); 
  audioSrc.connect(analyser);
};


function clearImageData() {
  for (let i = 0, l = data.length; i < l; i += 4) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 255;
  }
};


function setPixel(x, y, r, g, b, a) {
  const i = (x + y * imageData.width) * 4;

  data[i] = r;
  data[i + 1] = g;
  data[i + 2] = b;
  data[i + 3] = a;
};


function drawLine(x1, y1, x2, y2, r, g, b, a) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);

  const sx = (x1 < x2) ? 1 : -1;
  const sy = (y1 < y2) ? 1 : -1;

  let err = dx - dy;

  let lx = x1;
  let ly = y1;    

  while (true) {
    if (lx > 0 && lx < w && ly > 0 && ly < h) {
      setPixel( lx, ly, r, g, b, a );
    }

    if ((lx === x2) && (ly === y2))
      break;  

    const e2 = 2 * err;

    if (e2 > -dx) { 
      err -= dy; 
      lx += sx; 
    }

    if (e2 < dy) { 
      err += dx; 
      ly += sy; 
    }
  }
};


function addParticle(x, y, z, index) {
  let particle = {};
  
  particle.x = x;
  particle.y = y;
  particle.z = z;
  particle.x2d = 0;
  particle.y2d = 0;
  particle.index = index;

  return particle;
};

function addParticles(array, dir) {
  let audioBufferIndexMin = 8;
  let audioBufferIndexMax = 512;
  let audioBufferIndex = audioBufferIndexMin;

  for (let z = -fov; z < fov; z += 5) { 
    let particlesRow = [];

    for (let x = -fov; x < fov; x += 5) { 
      let yPos = 0;

      if (dir > 0) {
        yPos = Math.random() * 5 + particleDistanceTop;
      } else {
        yPos = Math.random() * 5 - particleDistanceTop;
      }

      const particle = addParticle(x, yPos, z, audioBufferIndex);

      particlesRow.push(particle); 

      audioBufferIndex++;

      if (audioBufferIndex > audioBufferIndexMax) {
          audioBufferIndex = audioBufferIndexMin;
      }
    }

    array.push(particlesRow);
  }
};


function onResize(){
  w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  center2D = {
    x: w / 2, 
    y: h / 2 
  };

  canvas.width = w;
  canvas.height = h;

  context.fillStyle = '#000000';
  context.fillRect(0, 0, w, h);

  imageData = context.getImageData(0, 0, w, h);
  data = imageData.data;
};


function mouseDownHandler(event) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};


function mouseEnterHandler(event) {
  mouseActive = true;
};


function mouseLeaveHandler(event) {
  mouseActive = false;
  mousePos.x = w / 2;
  mouseDown = false;
};


function mouseMoveHandler(event) {
  mousePos = getMousePos(canvas, event);
};


function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();

  return { 
    x: event.clientX - rect.left, 
    y: event.clientY - rect.top 
  };
};


function render() {
  let frequencySource;
  
  if (analyser) {
      frequencySource = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(frequencySource);
  }

  let sortArray = false;

  for (let i = 0, l = particles.length; i < l; i++) {
    const particlesRow = particles[i];
    let particlesRowBack;

    if (i > 0) {
      particlesRowBack = particles[i - 1];
    }

    for (let j = 0, k = particlesRow.length; j < k; j++) {
      const particle = particlesRow[j];
      const scale = fov / (fov + particle.z); 

      particle.x2d = (particle.x * scale) + center2D.x;
      particle.y2d = (particle.y * scale) + center2D.y;

      particle.z -= speed;
      
      if (analyser) {
        const frequency = frequencySource[particle.index];
        const frequencyAdd = frequency / 10;

        particle.y = frequencyAdd + particleDistanceTop;
      }

      if (particle.z < -fov) {
          particle.z += (fov * 2);
          sortArray = true;
      }

      let lineColorValue;

      if (j > 0) {
        const p = particlesRow[j - 1];
        lineColorValue = Math.round( i / l * 155 );

        drawLine(particle.x2d | 0, 
                 particle.y2d | 0, 
                 p.x2d | 0, 
                 p.y2d | 0, 
                 0, lineColorValue, 0, 255);
      }

      if (i > 0 && i < l - 1) {
        const pB = particlesRowBack[j];

        drawLine(particle.x2d | 0, 
                 particle.y2d | 0, 
                 pB.x2d | 0, 
                 pB.y2d | 0,
                 0, lineColorValue, 0, 255);
      }
    }             
  }

  if (sortArray) {
    particles = particles.sort((a, b) => b[0].z - a[0].z);
  }

  for (let i = 0, l = particlesSky.length; i < l; i++) {
    const particlesRow = particlesSky[i];
    let particlesRowBack;

    if (i > 0) {
      particlesRowBack = particlesSky[i - 1];
    }

    for (let j = 0, k = particlesRow.length; j < k; j++) {
      const particle = particlesRow[j];

      const scale = fov / (fov + particle.z); 

      particle.x2d = (particle.x * scale) + center2D.x;
      particle.y2d = (particle.y * scale) + center2D.y;

      particle.z -= speed;
      
      if (analyser) {
        const frequency = frequencySource[particle.index];
        const frequencyAdd = frequency / 10;

        particle.y = -frequencyAdd - particleDistanceTop;
      }

      if (particle.z < -fov) {
        particle.z += (fov * 2);
        sortArray = true;
      }

      let lineColorValue;

      if (j > 0) {
        const p = particlesRow[j - 1];

        lineColorValue = Math.round(i / l * 255);

        drawLine(particle.x2d | 0, 
                 particle.y2d | 0, 
                 p.x2d | 0, 
                 p.y2d | 0, 
                 0, Math.round(lineColorValue / 2), lineColorValue, 255);
      }

      if (i > 0 && i < l - 1) {
        const pB = particlesRowBack[j];
        drawLine(particle.x2d | 0, 
                 particle.y2d | 0, 
                 pB.x2d | 0, pB.y2d | 0, 
                 0, Math.round(lineColorValue / 2), lineColorValue, 255);
      }
    }
  }

  if (sortArray) {
    particlesSky = particlesSky.sort((a, b) => b[0].z - a[0].z);
  }

  if (mouseActive) {
    center2D.x += (mousePos.x - center2D.x) * 0.015;
  } else {
    center2D.x += ((canvas.width / 2) - center2D.x) * 0.015;
  }
};


function animate() {
  clearImageData();
  render();
  
  context.putImageData(imageData, 0, 0);
  requestAnimationFrame(animate);
};


window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame       
       || window.webkitRequestAnimationFrame 
       || window.mozRequestAnimationFrame    
       || function(callback) {
    window.setTimeout( callback, 1000 / 60 );
  };
})();


window.onload = (() => {
    const topArea = document.getElementById('top');
    const menu = document.getElementById('menu_btn');

    topArea.addEventListener('mouseenter', (event) => {  
        event.target.click(); 
    })
    topArea.addEventListener('mouseover', (event) => {
        event.target.click();
    })

    initAnimation();

    musicGenres = document.querySelectorAll('.btn-secondary');

    musicGenres.forEach((elem) => {
      elem.addEventListener('mousedown', userStart, false);
    }); 
})();