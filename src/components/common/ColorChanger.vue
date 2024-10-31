<template>
    <div>
        <input type="color" v-model="color" />
        <p :style="{ color: color }">Text with dynamic color</p>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const color = ref('#000000');
</script>
  