<!-- DailyMessage.vue -->
<template>
  <transition name="slide-fade">
    <div v-if="isVisible" class="daily-message bg-light rounded p-4 mb-4 shadow-sm">
      <div :class="{ 'bounce-animation': shouldBounce }">
        <h2 class="h4 text-primary mb-3">
          <i class="bi bi-calendar-heart me-2"></i>
          Nous sommes {{ formattedDate }} !
        </h2>
        <p class="text-secondary">
          <span v-if="remainingStars > 0">
            Il te reste {{ remainingStars }} étoile{{ remainingStars > 1 ? 's' : '' }} à gagner !
          </span>
          <span v-else class="text-success">
            Bravo ! Tu as atteint ton objectif ! 🎉
          </span>
        </p>
        
        <!-- Étoiles animées -->
        <div class="stars-container mt-3">
          <transition-group name="star-pulse">
            <span
              v-for="n in Math.min(5, remainingStars)"
              :key="n"
              class="star-icon"
              :style="{ animationDelay: `${n * 200}ms` }"
            >⭐</span>
          </transition-group>
        </div>

        <!-- Message motivant aléatoire -->
        <div class="motivation-message mt-3" :class="{ 'fade-in': showMotivation }">
          <p class="text-primary">{{ currentMotivation }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  totalStars: {
    type: Number,
    required: true
  },
  goalValue: {
    type: Number,
    required: true
  }
});

const isVisible = ref(false);
const shouldBounce = ref(false);
const showMotivation = ref(false);

const motivationalMessages = [
  "Tu es sur la bonne voie ! 🚀",
  "Continue comme ça ! 💫",
  "Tu es formidable ! 🌟",
  "Chaque étoile te rapproche du but ! ✨",
  "Tu peux y arriver ! 💪"
];

const currentMotivation = ref(motivationalMessages[0]);

const remainingStars = computed(() => {
  return Math.max(0, props.goalValue - props.totalStars);
});

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date().toLocaleDateString('fr-FR', options);
});

// Animation de rebond périodique
const startBounceAnimation = () => {
  setInterval(() => {
    shouldBounce.value = true;
    setTimeout(() => {
      shouldBounce.value = false;
    }, 1000);
  }, 5000);
};

// Changement de message motivant périodique
const startMotivationRotation = () => {
  setInterval(() => {
    showMotivation.value = false;
    setTimeout(() => {
      currentMotivation.value = motivationalMessages[
        Math.floor(Math.random() * motivationalMessages.length)
      ];
      showMotivation.value = true;
    }, 500);
  }, 8000);
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 500);
  startBounceAnimation();
  startMotivationRotation();
});
</script>

<style scoped>
.daily-message {
  transition: all 0.5s ease-in-out;
}

.bounce-animation {
  animation: bounce 1s ease;
}

.star-icon {
  display: inline-block;
  margin: 0 4px;
  font-size: 1.5em;
  animation: starPulse 2s infinite;
}

.motivation-message {
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
}

.motivation-message.fade-in {
  opacity: 1;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.star-pulse-enter-active,
.star-pulse-leave-active {
  transition: all 0.5s ease;
}

.star-pulse-enter-from,
.star-pulse-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes starPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.dark-mode .daily-message {
  background-color: #2c3e50 !important;
  color: #fff;
}

.dark-mode .text-secondary {
  color: #a8b9cc !important;
}
</style>
