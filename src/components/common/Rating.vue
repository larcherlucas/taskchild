<template>
    <div class="rating">
        <span v-for="star in stars" :key="star" class="star" :class="{ 'filled': star <= rating }" @click="setRating(star)">
            ★
        </span>
        <span class="rating-value">{{ rating }}</span>
        <button @click="resetRating">Reset</button>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Rating',
    setup() {
        const rating = ref(0);
        const stars = [1, 2, 3, 4, 5];

        const setRating = (value: number) => {
            rating.value = value;
        };

        const resetRating = () => {
            rating.value = 0;
        };

        return { rating, stars, setRating, resetRating };
    },
});
</script>
  
<style lang="scss" scoped>
.rating {
    display: flex;
    align-items: center;

    .star {
        font-size: 2rem;
        color: #ccc;
        cursor: pointer;
        transition: color 0.3s;

        &.filled {
            color: #f39c12;
        }

        &:hover {
            color: #f39c12;
        }
    }

    .rating-value {
        margin-left: 10px;
        font-size: 1.5rem;
    }

    button {
        margin-left: 10px;
        padding: 5px 10px;
        cursor: pointer;
        background-color: #f39c12;
        border: none;
        border-radius: 4px;
        color: #fff;
        transition: background-color 0.3s;

        &:hover {
            background-color: #e08e0b;
        }
    }
}
</style>
  