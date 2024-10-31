<template>
    <div class="clock">
        <div class="hand hour" :style="{ transform: `rotate(${hourRotation}deg)` }"></div>
        <div class="hand minute" :style="{ transform: `rotate(${minuteRotation}deg)` }"></div>
        <div class="hand second" :style="{ transform: `rotate(${secondRotation}deg)` }"></div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'AnimatedClock',
    setup() {
        const secondRotation = ref(0);
        const minuteRotation = ref(0);
        const hourRotation = ref(0);

        const updateClock = () => {
            const now = new Date();
            secondRotation.value = (now.getSeconds() / 60) * 360;
            minuteRotation.value = (now.getMinutes() / 60) * 360 + (now.getSeconds() / 60) * 6;
            hourRotation.value = (now.getHours() / 12) * 360 + (now.getMinutes() / 60) * 30;
        };

        onMounted(() => {
            updateClock();
            setInterval(updateClock, 1000);
        });

        return {
            secondRotation,
            minuteRotation,
            hourRotation,
        };
    },
});
</script>
  
<style lang="scss" scoped>
.clock {
    position: relative;
    width: 200px;
    height: 200px;
    border: 10px solid #333;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .hand {
        position: absolute;
        bottom: 50%;
        background: #333;
        transform-origin: bottom;
        border-radius: 5px;
        transition: transform 0.5s ease-in-out;
    }

    .hour {
        width: 6px;
        height: 50px;
        background: black;
    }

    .minute {
        width: 4px;
        height: 70px;
        background: gray;
    }

    .second {
        width: 2px;
        height: 90px;
        background: red;
    }
}
</style>
  