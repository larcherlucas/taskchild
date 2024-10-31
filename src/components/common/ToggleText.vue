<template>
    <div>
        <button @click="toggle">{{ isVisible ? 'Hide' : 'Show' }} Text</button>
        <p v-if="isVisible">This is a toggleable text.</p>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const isVisible = ref(true);
const toggle = () => (isVisible.value = !isVisible.value);
</script>
  