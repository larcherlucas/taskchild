<script setup lang="ts">
import { useRouter } from 'vue-router';
import CustomButton from '@/components/common/Button.vue';
import ListLanguage from '@/components/common/ListLanguage.vue';
import { useLocale } from '@/composables/useLocale';


const router = useRouter();
const { t } = useLocale();
const goToSecondPage = () => {
  router.push('/second');
};
</script>
    
<template>
  <div class="home">
    <ListLanguage />
    <h1>{{ t('messages.homeIntro') }}</h1>
    <custom-button @click="goToSecondPage">{{ t('buttons.next') }}</custom-button>
  </div>
</template>


<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}
</style>
