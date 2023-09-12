<script setup lang="ts">
import { ref, onMounted } from "vue";

const TOTAL_PARTICLES = 10;
let canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  let particlesArray: Particle[] = [];

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.opacity = Math.random() * 0.5;
      this.size = Math.random() * 2 + 2; // Particle diameter varies from 2px to 4px
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.01;
    }
    draw() {
      if (ctx) {
        ctx.lineWidth = 0;
        // randomize opacity
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`; // Particle color is white
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  }

  function createParticles() {
    const xPos = Math.random() * (canvas.value?.width || 0);
    const yPos = Math.random() * (canvas.value?.height || 0);
    if (particlesArray.length < 100) {
      // Limit particles to 100
      particlesArray.push(new Particle(xPos, yPos));
    }
  }

  function animateParticles() {
    if (ctx && canvas.value) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      createParticles();
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.2) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
      setTimeout(() => requestAnimationFrame(animateParticles), 20);
    }
  }

  // Create initial particles
  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    createParticles();
  }

  animateParticles();
});
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 opacity-50" width="662" height="396"></canvas>
</template>
