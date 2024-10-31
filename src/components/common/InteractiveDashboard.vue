<template>
    <div class="dashboard">
        <div class="card" v-for="(item, index) in items" :key="index" @mouseover="hoveredIndex = index"
            @mouseleave="hoveredIndex = -1">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <transition name="scale">
                <div class="overlay" v-if="hoveredIndex === index">
                    <span>View More</span>
                </div>
            </transition>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'InteractiveDashboard',
    setup() {
        const items = ref([
            { title: 'Analytics', description: 'View your analytics' },
            { title: 'Settings', description: 'Adjust your settings' },
            { title: 'Profile', description: 'View your profile' },
        ]);

        const hoveredIndex = ref(-1);

        return { items, hoveredIndex };
    },
});
</script>
  
<style lang="scss" scoped>
.dashboard {
    display: flex;
    gap: 20px;

    .card {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        position: relative;
        transition: transform 0.3s;

        &:hover {
            transform: translateY(-5px);
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(76, 175, 80, 0.8);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            transition: opacity 0.3s;
        }
    }
}

.scale-enter-active,
.scale-leave-active {
    transition: transform 0.3s;
}

.scale-enter,
.scale-leave-to {
    transform: scale(0);
}</style>
  