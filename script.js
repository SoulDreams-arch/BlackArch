document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let dots = [];
  let lines = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Dot {
    constructor(x, y, radius, speed) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speed = speed;
      this.dx = (Math.random() - 0.5) * speed;
      this.dy = (Math.random() - 0.5) * speed;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 3, false);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    }

    update() {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }

    connect(dot) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(dot.x, dot.y);
      ctx.strokeStyle = 'grey';
      ctx.stroke();
      ctx.closePath();
    }
  }

  function init() {
    dots = [];
    lines = [];

    for (let i = 0; i < 50; i++) {
      const radius = 3;
      const x = Math.random() * (canvas.width - radius * 3) + radius;
      const y = Math.random() * (canvas.height - radius * 3) + radius;
      const speed = 1;

      dots.push(new Dot(x, y, radius, speed));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dots.length; i++) {
      dots[i].update();
    }

    for (let i = 0; i < lines.length; i++) {
      const [dot1, dot2] = lines[i];
      dot1.connect(dot2);
    }
  }

  function connectDots(dot) {
    const maxDistance = 100;
    const connectedDots = [];

    for (let i = 0; i < dots.length; i++) {
      if (dot !== dots[i] && getDistance(dot.x, dot.y, dots[i].x, dots[i].y) < maxDistance) {
        connectedDots.push(dots[i]);
      }
    }

    for (let i = 0; i < connectedDots.length; i++) {
      lines.push([dot, connectedDots[i]]);
    }
  }

  function getDistance(x1, y1, x2, y2) {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  init();
  animate();
});

/*function toggleLinks(event, modId) {
    event.stopPropagation();
    const links = document.getElementById(modId + '-links');
    links.classList.toggle('show');
}*/


  function toggleLinks(event, modId) {
    const modSections = document.querySelectorAll('.mod-section');
    event.stopPropagation();
    const links = document.getElementById(modId + '-links');
    links.classList.toggle('show');

    // Schließe alle anderen Mod-Flächen
    modSections.forEach(function(modSection) {
      if (modSection !== links.parentNode) {
        modSection.querySelector('.links').classList.remove('show');
      }
    });
  }
