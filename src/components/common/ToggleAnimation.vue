<template>
    <div class="toggle-container" @click="toggle">
        <div class="toggle-circle" :class="{ active: isActive }"></div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ToggleAnimation',
    setup() {
        const isActive = ref(false);
        const toggle = () => (isActive.value = !isActive.value);

        return { isActive, toggle };
    },
});
</script>
  
<style lang="scss" scoped>
.toggle-container {
    width: 60px;
    height: 30px;
    background-color: #ccc;
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.active {
        background-color: #4caf50;
    }
}

.toggle-circle {
    width: 28px;
    height: 28px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: transform 0.3s ease;

    &.active {
        transform: translateX(30px);
    }
}
</style>
  