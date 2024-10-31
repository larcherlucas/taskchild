<template>
    <form @submit.prevent="submitForm">
        <input v-model="email" placeholder="Email" @input="validateEmail" />
        <p v-if="!isEmailValid && email">Invalid email format</p>

        <input type="password" v-model="password" placeholder="Password" @input="validatePassword" />
        <p v-if="!isPasswordValid && password">Password must be 8+ characters</p>

        <button type="submit" :disabled="!isFormValid">Submit</button>
    </form>
</template>
  
<script lang="ts" setup>
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');

const isEmailValid = ref(false);
const isPasswordValid = ref(false);

const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isEmailValid.value = emailPattern.test(email.value);
};

const validatePassword = () => {
    isPasswordValid.value = password.value.length >= 8;
};

const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value);

const submitForm = () => {
    alert('Form submitted!');
};
</script>
  