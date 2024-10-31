<template>
    <div class="carousel">
        <button @click="prev">Prev</button>
        <img :src="images[currentIndex]" alt="Carousel Image" />
        <button @click="next">Next</button>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'ImageCarousel',
    setup() {
        const images = ref([
            'image1.jpg',
            'image2.jpg',
            'image3.jpg',
        ]);
        const currentIndex = ref(0);

        const prev = () => {
            currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
        };

        const next = () => {
            currentIndex.value = (currentIndex.value + 1) % images.value.length;
        };

        return {
            images,
            currentIndex,
            prev,
            next,
        };
    },
});
</script>
  
<style lang="scss" scoped>
.carousel {
    display: flex;
    align-items: center;

    img {
        width: 300px;
        height: auto;
    }

    button {
        margin: 0 10px;
        padding: 10px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
}
</style>
  