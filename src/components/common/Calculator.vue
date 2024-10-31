<template>
    <div>
        <input v-model.number="num1" type="number" placeholder="Enter number" />
        <input v-model.number="num2" type="number" placeholder="Enter number" />
        <p>Sum: {{ num1 + num2 }}</p>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const num1 = ref(0);
const num2 = ref(0);
</script>
  