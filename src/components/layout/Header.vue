<template>
  <header class="bg-primary bg-gradient text-white py-4 mb-4 shadow-sm position-relative">
    <!-- Animation de félicitations -->
    <div v-if="showCongrats" class="congratulation-overlay">
      <div class="congratulation-content">
        <i class="bi bi-stars display-1 mb-3 text-warning"></i>
        <h2 class="display-4 mb-3">Félicitations !</h2>
        <p class="lead">Tu as atteint ton objectif ! 🎉</p>
        <button @click="closeCongrats" class="btn btn-warning mt-3">
          Continuer
        </button>
      </div>
    </div>

    <!-- Modal pour les rappels du dimanche -->
    <div v-if="showSundayReminder" class="reminder-overlay" @click.self="closeReminder">
      <div class="reminder-content">
        <div class="card bg-warning text-dark">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h3 class="mb-0">Liste des tâches pour atteindre ton objectif 🎯</h3>
            <button @click="closeReminder" class="btn-close" aria-label="Fermer"></button>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li v-for="(task, index) in sundayTasks" 
                  :key="index" 
                  class="list-group-item d-flex align-items-center gap-2"
                  :class="{ 'completed': task.completed }">
                <input 
                  type="checkbox" 
                  :id="'task-' + index"
                  v-model="task.completed" 
                  class="form-check-input"
                />
                <label :for="'task-' + index" class="form-check-label flex-grow-1">
                  {{ task.text }}
                </label>
                <i v-if="task.completed" class="bi bi-check-circle-fill text-success"></i>
              </li>
            </ul>
            <div class="mt-3 text-center">
              <p class="mb-2">Complète ces tâches pour atteindre ton objectif ! 💪</p>
              <button @click="closeReminder" class="btn btn-primary">
                Je vais le faire !
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row align-items-center">
        <!-- Date du jour -->
        <div class="col-12 mb-3">
          <div class="current-date">
            <i class="bi bi-calendar3 me-2"></i>
            {{ formattedDate }}
          </div>
        </div>

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
const goalValue = ref(appStore.goal);
const showCongrats = ref(false);
const showSundayReminder = ref(false);
const isProgressAnimated = ref(false);
const previousProgress = ref(0);

// Liste des tâches du dimanche
const sundayTasks = ref([
  { text: "Range ta chambre", completed: false },
  { text: "Sois sage", completed: false },
  { text: "Fais un câlin à maman et à papa", completed: false },
  { text: "Brosse tes dents", completed: false },
  { text: "Mange bien ton repas", completed: false }
]);

// Formater la date en français
const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date().toLocaleDateString('fr-FR', options);
});

// Vérifier si c'est dimanche
const isSunday = computed(() => {
  return new Date().getDay() === 0;
});

// Obtenir le jour de la semaine (0-6)
const currentDay = computed(() => {
  return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
});

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

// Vérifier le dimanche et l'objectif
onMounted(() => {
  checkSundayGoal();
});

const checkSundayGoal = () => {
  if (isSunday.value && progressPercentage.value < 100) {
    showSundayReminder.value = true;
  }
};

const closeReminder = () => {
  showSundayReminder.value = false;
};

watch(goalValue, (newValue) => {
  if (newValue < totalStars.value) {
    setTimeout(() => {
      alert("L'objectif ne peut pas être inférieur au nombre d'étoiles actuel !");
      goalValue.value = totalStars.value;
    }, 0);
    return;
  }
  appStore.setGoal(newValue);
});

watch(progressPercentage, (newValue, oldValue) => {
  if (newValue === 100 && oldValue !== 100) {
    showCongrats.value = true;
    isProgressAnimated.value = true;
  }
  previousProgress.value = newValue;
});

const closeCongrats = () => {
  showCongrats.value = false;
};
</script>

<style scoped>
.dark-mode .bg-primary {
  background-color: #2c3e50 !important;
}

.current-date {
  font-size: 1.2rem;
  opacity: 0.9;
  animation: fadeIn 0.5s ease-out;
}

.reminder-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  animation: fadeIn 0.3s ease-out;
}

.reminder-content {
  width: 90%;
  max-width: 500px;
  animation: slideIn 0.3s ease-out;
}

.list-group-item {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.list-group-item.completed {
  background-color: rgba(25, 135, 84, 0.1);
  text-decoration: line-through;
}

.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ... Autres styles existants ... */

.congratulation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  animation: fadeIn 0.5s ease-out;
}

.congratulation-content {
  text-align: center;
  padding: 2rem;
  animation: scaleIn 0.5s ease-out;
}

.progress-animation {
  animation: progressPulse 2s infinite;
}

.animate-pulse {
  animation: textPulse 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { 
    transform: scale(0.8);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
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
</style>