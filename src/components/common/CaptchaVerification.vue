<template>
    <div class="captcha-container">
        <p>Pour vérifier que vous êtes humain, répondez à cette question :</p>
        <div class="math-operation">
            <span>{{ number1 }} + {{ number2 }} =</span>
            <input type="number" v-model="userAnswer" placeholder="Réponse" />
            <button @click="checkAnswer">Vérifier</button>
        </div>
        <p v-if="isVerified" class="success">CAPTCHA validé !</p>
        <p v-if="error" class="error">Mauvaise réponse, réessayez.</p>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'CaptchaVerification',
    setup() {
        const number1 = ref(generateRandomNumber());
        const number2 = ref(generateRandomNumber());
        const correctAnswer = ref<number | null>(null);
        const userAnswer = ref<number | null>(null);
        const isVerified = ref(false);
        const error = ref(false);

        // Fonction pour générer un nombre aléatoire
        function generateRandomNumber() {
            return Math.floor(Math.random() * 10) + 1;
        }

        // Met à jour la réponse correcte lorsque les nombres changent
        const updateCorrectAnswer = () => {
            correctAnswer.value = number1.value + number2.value;
        };

        updateCorrectAnswer();

        // Vérifie la réponse de l'utilisateur
        const checkAnswer = () => {
            if (userAnswer.value === correctAnswer.value) {
                isVerified.value = true;
                error.value = false;
                resetCaptcha();
            } else {
                error.value = true;
                userAnswer.value = null;  // Réinitialise l'input
            }
        };

        // Réinitialise le captcha avec de nouveaux nombres
        const resetCaptcha = () => {
            number1.value = generateRandomNumber();
            number2.value = generateRandomNumber();
            updateCorrectAnswer();
        };

        return {
            number1,
            number2,
            userAnswer,
            isVerified,
            error,
            checkAnswer
        };
    }
});
</script>
  
<style scoped>
.captcha-container {
    text-align: center;
    margin-top: 10px;
}

.math-operation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

input {
    width: 50px;
    padding: 5px;
    text-align: center;
}

button {
    padding: 5px 10px;
    cursor: pointer;
}

.success {
    color: green;
    margin-top: 10px;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
  