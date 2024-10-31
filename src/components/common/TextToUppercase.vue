<template>
    <div>
        <input v-model="text" placeholder="Type here" />
        <p>Uppercase: {{ text.toUpperCase() }}</p>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('');
</script>
  