<template>
  <header class="bg-primary bg-gradient text-white py-4 mb-4 shadow-sm">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-6 mb-3 mb-md-0">
          <div class="d-flex align-items-center">
            <div class="display-6 mb-0">
              <i class="bi bi-star-fill me-2 text-warning"></i>
              {{ totalStars }} étoiles
            </div>
          </div>
        </div>
        
        <div class="col-12 col-md-6">
          <div class="row align-items-center">
            <label for="goal" class="col-auto col-form-label fw-bold">Objectif:</label>
            <div class="col">
              <div class="input-group">
                <input 
                  v-model="goalValue"
                  type="number"
                  class="form-control"
                  id="goal"
                  placeholder="Entrez votre objectif"
                  aria-describedby="goalHelp"
                  min="0"
                  :class="{ 'is-invalid': isGoalInvalid }"
                />
                <span class="input-group-text">
                  <i class="bi bi-trophy-fill text-warning"></i>
                </span>
              </div>
              <div 
                id="goalHelp" 
                class="form-text"
                :class="messageClass"
              >
                {{ currentMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="progress mt-3" style="height: 10px">
        <div 
          class="progress-bar bg-warning" 
          role="progressbar"
          :style="{ width: progressPercentage + '%' }"
          :aria-valuenow="progressPercentage"
          aria-valuemin="0"
          aria-valuemax="100"
          :class="{ 'progress-animation': isProgressAnimated }"
        >
          <span class="visually-hidden">{{ progressPercentage }}% Progrès</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppStore, type AppStore } from '@/stores/app';
import { computed, ref, watch, onMounted } from 'vue';

const appStore: AppStore = useAppStore();

// Retrieve the goal from localStorage if available, otherwise use the appStore goal
const savedGoal = localStorage.getItem('goal');
const goalValue = ref(savedGoal ? Number(savedGoal) : appStore.goal);

const totalStars = computed(() => {
  if (goalValue.value && appStore.totalStars > goalValue.value) {
    return goalValue.value;
  }
  return appStore.totalStars;
});

const progressPercentage = computed(() => {
  if (!goalValue.value || goalValue.value <= 0) return 0;
  return Math.min(Math.round((totalStars.value / goalValue.value) * 100), 100);
});

const isGoalInvalid = computed(() => {
  return goalValue.value !== null && goalValue.value < totalStars.value;
});

const currentMessage = computed(() => {
  if (!goalValue.value) return "Définissez votre objectif d'étoiles";
  if (progressPercentage.value === 100) return "Félicitations ! Objectif atteint ! 🎉";
  
  const remaining = goalValue.value - totalStars.value;
  
  if (progressPercentage.value >= 90) return "Fonce ! Tu y es presque ! 🚀";
  if (progressPercentage.value >= 50) return "Continue, tu es à la moitié ! 💪";
  if (progressPercentage.value >= 10) return "Tu es sur la bonne route ! 🌟";
  
  return `Plus que ${remaining} étoile${remaining > 1 ? 's' : ''} pour atteindre votre objectif`;
});

const messageClass = computed(() => {
  if (progressPercentage.value === 100) return 'text-warning animate-pulse';
  return 'text-white-50';
});

// Watch for changes to goalValue and update localStorage
watch(goalValue, (newValue) => {
  if (newValue < totalStars.value) {
    setTimeout(() => {
      alert("L'objectif ne peut pas être inférieur au nombre d'étoiles actuel !");
      goalValue.value = totalStars.value;
    }, 0);
    return;
  }

  // Save the new goal value to localStorage
  localStorage.setItem('goal', newValue.toString());

  // Optionally, update the store if needed
  appStore.setGoal(newValue);
});
</script>

<style scoped>
.dark-mode .bg-primary {
  background-color: #2c3e50 !important;
}

.form-text {
  transition: all 0.3s ease-in-out;
}

.is-invalid {
  border-color: #dc3545;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.progress-animation {
  animation: progressPulse 2s infinite;
}

.animate-pulse {
  animation: textPulse 2s infinite;
}

@keyframes progressPulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}

@keyframes textPulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
