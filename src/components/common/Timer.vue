<template>
    <div>
        <p>Timer: {{ timer }}s</p>
        <button @click="start">Start</button>
        <button @click="stop">Stop</button>
        <button @click="reset">Reset</button>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';

const timer = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

const start = () => {
    if (!interval) {
        interval = setInterval(() => {
            timer.value++;
        }, 1000);
    }
};

const stop = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
};

const reset = () => {
    timer.value = 0;
};

onUnmounted(() => {
    if (interval) clearInterval(interval);
});
</script>
  