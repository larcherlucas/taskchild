<template>
    <div>
        <input type="password" v-model="password" placeholder="Enter password" @input="checkStrength"
            @focus="startTyping" />
        <button @click="validatePassword">Valider</button>
        <ul v-if="showCriteria">
            <li v-if="!lengthCriteria">At least 8 characters</li>
            <li v-if="!numberCriteria">At least one number</li>
            <li v-if="!specialCharCriteria">At least one special character (e.g., !@#$%^&*)</li>
            <li v-if="!uppercaseCriteria">At least one uppercase letter</li>
            <li v-if="!lowercaseCriteria">At least one lowercase letter</li>
        </ul>
        <p v-if="isValid && showCriteria">ok</p>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

const password = ref('');
const strength = ref('Weak');
const hasTyped = ref(false);
const showCriteria = ref(false);

// Critères de vérification
const lengthCriteria = ref(false);
const numberCriteria = ref(false);
const specialCharCriteria = ref(false);
const uppercaseCriteria = ref(false);
const lowercaseCriteria = ref(false);
const isValid = ref(false);

const startTyping = () => {
    hasTyped.value = true;
};

const checkStrength = () => {
    lengthCriteria.value = password.value.length >= 8;
    numberCriteria.value = /[0-9]/.test(password.value);
    specialCharCriteria.value = /[!@#$%^&*]/.test(password.value);
    uppercaseCriteria.value = /[A-Z]/.test(password.value);
    lowercaseCriteria.value = /[a-z]/.test(password.value);

    isValid.value =
        lengthCriteria.value &&
        numberCriteria.value &&
        specialCharCriteria.value &&
        uppercaseCriteria.value &&
        lowercaseCriteria.value;

    // Déterminer la force du mot de passe
    if (isValid.value) {
        strength.value = 'Strong';
    } else if (
        lengthCriteria.value &&
        (numberCriteria.value || specialCharCriteria.value) &&
        (uppercaseCriteria.value || lowercaseCriteria.value)
    ) {
        strength.value = 'Moderate';
    } else {
        strength.value = 'Weak';
    }
};

const validatePassword = () => {
    checkStrength();
    showCriteria.value = true;
};
</script>
  
<style scoped>
/* Ajoutez des styles pour l'input et les messages si nécessaire */
input {
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    color: red;
    /* Peut être ajusté pour refléter la gravité */
}

p {
    color: green;
    /* Le message "ok" apparaîtra en vert */
}
</style>
  