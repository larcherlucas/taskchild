<template>
    <div class="grid-container">
        <div class="grid-item" v-for="(item, index) in items" :key="index">
            <component :is="item.component" />
            <button @click="copyCode(item.code)">Copier le Code</button>

        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

import CheckboxSingle from '@/components/common/CheckboxSingle.vue';
import CheckboxGroup from '@/components/common/CheckboxGroup.vue';
import Counter from '@/components/common/Counter.vue';
import ColorChanger from '@/components/common/ColorChanger.vue';
import ToggleText from '@/components/common/ToggleText.vue';
import UserInput from '@/components/common/UserInput.vue';
import TextToUppercase from '@/components/common/TextToUppercase.vue';
import Calculator from '@/components/common/Calculator.vue';
import Timer from '@/components/common/Timer.vue';
import PasswordStrengthChecker from '@/components/common/PasswordStrengthChecker.vue';
import PasswordVisibilityToggle from '@/components/common/PasswordVisibilityToggle.vue';
import FormValidation from '@/components/common/FormValidation.vue';
import CaptchaVerification from '@/components/common/CaptchaVerification.vue';
import SecurePasswordGenerator from '@/components/common/SecurePasswordGenerator.vue';
import ToggleAnimation from '@/components/common/ToggleAnimation.vue';
import SpinningLoader from '@/components/common/SpinningLoader.vue';
import LoadingText from '@/components/common/LoadingText.vue';
import AnimatedDatePicker from '@/components/common/AnimatedDatePicker.vue';
import InteractiveDashboard from '@/components/common/InteractiveDashboard.vue';
import AnimatedClock from '@/components/common/AnimatedClock.vue';
import ListFilter from '@/components/common/ListFilter.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import TimeDisplay from '@/components/common/TimeDisplay.vue';
import Rating from '@/components/common/Rating.vue';


export default defineComponent({
    name: 'EssaiView',
    components: {
        CheckboxSingle,
        CheckboxGroup,
        Counter,
        ColorChanger,
        ToggleText,
        UserInput,
        TextToUppercase,
        Calculator,
        Timer,
        PasswordStrengthChecker,
        PasswordVisibilityToggle,
        FormValidation,
        CaptchaVerification,
        SecurePasswordGenerator,
        ToggleAnimation,
        SpinningLoader,
        LoadingText,
        AnimatedDatePicker,
        InteractiveDashboard,
        ListFilter,
        ProgressBar,
        TimeDisplay,
        AnimatedClock,
        Rating,
    },
    setup() {
        // Configuration des éléments de la grille
        const items = ref([
            { component: 'CheckboxSingle', code: `<CheckboxSingle />` },
            { component: 'CheckboxGroup', code: `<CheckboxGroup />` },
            { component: 'Counter', code: `<Counter />` },
            { component: 'ColorChanger', code: `<ColorChanger />` },
            { component: 'ToggleText', code: `<ToggleText />` },
            { component: 'UserInput', code: `<UserInput />` },
            { component: 'TextToUppercase', code: `<TextToUppercase />` },
            { component: 'Calculator', code: `<Calculator />` },
            { component: 'Timer', code: `<Timer />` },
            { component: 'PasswordStrengthChecker', code: `<PasswordStrengthChecker />` },
            { component: 'PasswordVisibilityToggle', code: `<PasswordVisibilityToggle />` },
            { component: 'FormValidation', code: `<FormValidation />` },
            { component: 'CaptchaVerification', code: `<CaptchaVerification />` },
            { component: 'SecurePasswordGenerator', code: `<SecurePasswordGenerator />` },
            { component: 'ToggleAnimation', code: `<ToggleAnimation />` },
            { component: 'SpinningLoader', code: `<SpinningLoader />` },
            { component: 'LoadingText', code: `<LoadingText />` },
            { component: 'AnimatedDatePicker', code: `<AnimatedDatePicker />` },
            { component: 'InteractiveDashboard', code: `<InteractiveDashboard />` },
            { component: 'AnimatedClock', code: `<AnimatedClock />` },
            { component: 'ListFilter', code: `<ListFilter />` },
            { component: 'ProgressBar', code: `<ProgressBar />` },
            { component: 'TimeDisplay', code: `<TimeDisplay />` },
            { component: 'Rating', code: `<Rating />` },
        ]);

        // Fonction pour copier le code dans le presse-papiers
        const copyCode = (code: string) => {
            navigator.clipboard.writeText(code).then(() => {
                alert('Code copié dans le presse-papiers!');
            }).catch(err => {
                console.error('Échec de la copie :', err);
            });
        };

        return {
            items,
            copyCode,
        };
    },
});
</script>
  
<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 20px;
}

.grid-item {
    background-color: #f0f0f0;
    padding: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
  