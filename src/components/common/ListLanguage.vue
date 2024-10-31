<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLocale } from '@/composables/useLocale';

const { changeLocale, initLocale } = useLocale();
const selected = ref('fr');
const { t } = useLocale();

// Initialiser la langue au montage du composant
onMounted(() => {
    initLocale();
    selected.value = localStorage.getItem('locale') || 'fr';
});

const updateLocale = () => {
    changeLocale(selected.value);
};
</script>

<template>
    <div>
        <div>{{ t('messages.language') }} </div>

        <select v-model="selected" @change="updateLocale">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="zh">Mandarin</option>
            <option value="ja">Japonais</option>
            <option value="ko">Coréen</option>
            <option value="ru">Russe</option>
            <option value="de">Allemand</option>
            <option value="it">Italien</option>
            <option value="es">Espagnol</option>
        </select>
    </div>
</template>
