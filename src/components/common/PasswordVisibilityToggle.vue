<template>
    <div>
        <input :type="isVisible ? 'text' : 'password'" v-model="password" placeholder="Enter password" />
        <button @click="toggleVisibility">{{ isVisible ? 'Hide' : 'Show' }} Password</button>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const password = ref('');
const isVisible = ref(false);

const toggleVisibility = () => (isVisible.value = !isVisible.value);
</script>
  