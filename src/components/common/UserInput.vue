<template>
    <div>
        <input v-model="userInput" placeholder="Type something..." />
        <p>You typed: {{ userInput }}</p>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const userInput = ref('');
</script>
  