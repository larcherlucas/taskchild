<template>
    <div class="loading-container">
        Loading<span v-if="showDots">...</span>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showDots = ref(true);
let intervalId: number | null = null;

const toggleDots = () => {
    showDots.value = !showDots.value;
};

onMounted(() => {
    intervalId = window.setInterval(toggleDots, 1000);
});

onUnmounted(() => {
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
});
</script>
  
<style scoped>
.loading-container {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: #007BFF;
    /* Modern blue color for better visibility */
    font-family: 'Arial', sans-serif;
    /* Modern font for better readability */
}
</style>
  