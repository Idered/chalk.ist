<script setup lang="ts">
import { useElementSize, useParentElement, watchImmediate } from "@vueuse/core";
import { computed, nextTick, ref } from "vue";
import { Particle } from "~/lib/particle";
import { state } from "~/lib/state";
import { store } from "~/lib/store";

const parentElement = useParentElement();
const { height } = useElementSize(parentElement);

const scale = 4;

const canvas = ref<HTMLCanvasElement | null>(null);
const showParticles = computed(
  () => store.value.showParticles && state.supported.particles,
);

watchImmediate(showParticles, async () => {
  await nextTick();
  const ctx = canvas.value?.getContext("2d");
  if (!ctx || !canvas.value) return;
  const particlesArray: Particle[] = [];

  function createParticles() {
    if (!ctx) return;
    const xPos = Math.random() * (canvas.value?.width || 0);
    const yPos = Math.random() * (canvas.value?.height || 0);

    if (particlesArray.length < 100) {
      particlesArray.push(new Particle(xPos, yPos));
    }
  }

  function animateParticles() {
    if (!(ctx && canvas.value)) {
      return;
    }

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    // const bg = cssGradientToCanvas(
    //   ctx,
    //   props.theme.background,
    //   canvas.value.width,
    //   canvas.value.height,
    // );

    // if (bg instanceof CanvasGradient) {
    //   ctx.fillStyle = bg;
    //   // ctx.filter = "blur(30px)";
    //   ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
    // }

    createParticles();

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw(ctx);

      if (particlesArray[i].size <= 0.2) {
        particlesArray.splice(i, 1);
        i--;
      }
    }

    setTimeout(() => requestAnimationFrame(animateParticles), 1000 / 60);
  }

  animateParticles();
});
</script>

<template>
  <canvas
    v-if="showParticles"
    ref="canvas"
    class="particles-bg absolute inset-0"
    :width="store.frameWidth * scale"
    :height="height * scale"
    :style="{
      width: `${store.frameWidth}px`,
      height: `${height}px`,
    }"
  />
</template>
