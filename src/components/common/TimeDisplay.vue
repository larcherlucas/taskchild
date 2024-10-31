<template>
    <div>
        <p>Current Time: {{ currentTime }}</p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'TimeDisplay',
    setup() {
        const currentTime = ref('');

        const updateTime = () => {
            const time = new Date();
            currentTime.value = time.toLocaleTimeString();
        };

        onMounted(() => {
            updateTime();
            setInterval(updateTime, 1000);
        });

        return {
            currentTime,
        };
    },
});
</script>
  
<style lang="scss" scoped>
p {
    font-size: 1.2rem;
}
</style>
  