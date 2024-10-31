<script setup lang="ts">
import { useRouter } from 'vue-router';
import CustomButton from '@/components/common/Button.vue';
import { useLocale } from '@/composables/useLocale';

const { t } = useLocale();

const router = useRouter();
const goToHome = () => {
  router.push('/example');
};
</script>

<template>
  <div class="second">
    <h1>{{ t('messages.secondPageIntro') }}</h1>
    <p>{{ t('messages.example') }}</p>
    <custom-button @click="goToHome">{{ t('buttons.next') }}</custom-button>
  </div>
</template>


<style scoped>
.second {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}
</style>
