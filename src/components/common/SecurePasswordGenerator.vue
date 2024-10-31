<template>
    <div>
        <label>Length: <input type="number" v-model.number="length" min="8" max="20" /></label>
        <label><input type="checkbox" v-model="useSpecialChars" /> Use Special Characters</label>
        <button @click="generatePassword">Generate Password</button>
        <p>Password: {{ password }}</p>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const length = ref(12);
const useSpecialChars = ref(true);
const password = ref('');

const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const specialChars = '!@#$%^&*';
    let charSet = chars + (useSpecialChars.value ? specialChars : '');
    password.value = Array.from({ length: length.value }, () => charSet[Math.floor(Math.random() * charSet.length)]).join('');
};
</script>
  