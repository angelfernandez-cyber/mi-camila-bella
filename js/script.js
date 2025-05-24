const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const word = "TE AMO MI AMORCITO";
const fontSize = 30;
const totalWords = 40; // Cantidad de palabras que caerán
let drops = [];
let particles = [];

// Inicializar las palabras con posiciones aleatorias y velocidad
for (let i = 0; i < totalWords; i++) {
  drops.push({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    speed: 3 + Math.random() * 5 // Velocidad de caída (ajústala aquí)
  });
}

function explode(x, y) {
  for (let i = 0; i < 25; i++) {
    particles.push({
      x,
      y,
      radius: Math.random() * 4 + 2,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      alpha: 1
    });
  }
}

function drawText() {
  // Fondo negro
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = "center";
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "#ff1c1c";
  ctx.shadowColor = "#ff1c1c";
  ctx.shadowBlur = 25;

  // Dibujar cada palabra en su posición
  drops.forEach(drop => {
    ctx.fillText(word, drop.x, drop.y);
    drop.y += drop.speed; // Velocidad de caída (ajústala aquí)
    
    // Reiniciar arriba cuando sale por abajo
    if (drop.y > canvas.height + fontSize) {
      drop.y = Math.random() * -100;
      drop.x = Math.random() * canvas.width;
      drop.speed = 3 + Math.random() * 5; // Actualiza velocidad con nuevo rango
    }
  });

  // Dibujar partículas explosivas
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.02;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

setInterval(drawText, 70);

// Explosión al hacer clic en cualquier lugar
canvas.addEventListener("click", (e) => {
  explode(e.clientX, e.clientY);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Recalcular posiciones aleatorias
  drops = [];
  for (let i = 0; i < totalWords; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      speed: 3 + Math.random() * 5 // Velocidad de caída (ajústala aquí)
    });
  }
});
