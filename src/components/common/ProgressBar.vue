<template>
    <div class="progress-bar">
        <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
    name: 'ProgressBar',
    setup() {
        const progress = ref(0);
        let intervalId: number | null = null;

        const startProgress = () => {
            intervalId = window.setInterval(() => {
                progress.value += 1;
                if (progress.value >= 100) {
                    progress.value = 0;
                }
            }, 100); // Ajustez la vitesse en millisecondes ici
        };

        const stopProgress = () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        onMounted(() => {
            startProgress();
        });

        onUnmounted(() => {
            stopProgress();
        });

        return {
            progress,
        };
    },
});
</script>
  
<style lang="scss" scoped>
.progress-bar {
    width: 100%;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;

    /* Assurez-vous que la barre ne déborde pas */
    .progress {
        height: 20px;
        background-color: #4caf50;
        transition: width 0.1s linear;
        /* Ajout de la transition pour l'animation en douceur */
    }
}
</style>
  