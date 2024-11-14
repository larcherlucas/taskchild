<template>
  <div class="container py-4" :class="{ 'dark-mode': isDarkMode }">
    <Header />

    <button @click="toggleDarkMode" class="theme-toggle-btn btn mb-4 animate__animated animate__rubberBand">
      <i :class="['bi', isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill', 'me-2']"></i>
      {{ isDarkMode ? 'Mode jour' : 'Mode nuit' }}
    </button>

    <div class="schedule-card mb-4 animate__animated animate__bounceIn">
      <div class="table-responsive">
        <table class="table table-hover mb-0 animate__animated animate__fadeIn">
          <thead>
            <tr>
              <th>Mes missions 🚀</th>
              <th>Lundi 🌱</th>
              <th>Mardi 🌸</th>
              <th>Mercredi 🌟</th>
              <th>Jeudi 🌈</th>
              <th>Vendredi 🎨</th>
              <th>Samedi 🎮</th>
              <th>Dimanche 🎪</th>
              <th class="text-center">Actions ⚡</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(activity, index) in activities"
              :key="index"
              class="animate__animated animate__fadeInUp"
            >
              <td class="align-middle activity-name">{{ activity.name }}</td>
              <td
                v-for="day in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']"
                :key="day"
                @click="toggleStar(index, day)"
                :class="{ 'has-star': schedule[index][day].includes('⭐') }"
                class="align-middle text-center day-cell"
              >
                <span class="star-container animate__animated animate__bounce">
                  {{ schedule[index][day] || '' }}
                </span>
              </td>
              <td class="align-middle text-center">
                <div class="btn-group animate__animated animate__slideInRight">
                  <button
                    @click="showEditModal(index)"
                    class="action-btn edit-btn"
                    aria-label="Modifier l'activité"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    @click="confirmDelete(index)"
                    class="action-btn delete-btn"
                    aria-label="Supprimer l'activité"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de modification -->
    <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier la mission</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="activityName" class="form-label">Nom de la mission</label>
              <input type="text" class="form-control" id="activityName" v-model="editedActivity.name" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" @click="saveEditedActivity">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div class="modal fade" id="deleteModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmer la suppression</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <p>Es-tu sûr de vouloir supprimer cette mission ?</p>
            <p class="text-muted mb-0">Cette action est irréversible.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-danger" @click="deleteActivity">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de déconnexion -->
    <div class="modal fade" id="logoutModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Déconnexion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <p class="text-muted mb-0">
              <i class="bi bi-door-open-fill me-2"></i>
              Bye bye !
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-danger" @click="logout">Se déconnecter</button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button @click="addActivity" class="fun-btn add-btn animate__animated animate__bounceIn">
        <i class="bi bi-plus-circle-fill me-2"></i>
        Nouvelle mission
      </button>
      <button @click="showLogoutModal" class="fun-btn logout-btn animate__animated animate__bounceIn">
        <i class="bi bi-door-open-fill me-2"></i>
        Au revoir !
      </button>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
interface Activity {
  name: string;
}

const appStore = useAppStore();
const authStore = useAuthStore();
const router = useRouter();
const isDarkMode = ref(false);

const activities = ref<Activity[]>([
  { name: 'Faire la vaisselle' },
  { name: 'Ranger ma chambre' },
  { name: 'Me brosser les dents' },
]);

const schedule = computed(() => appStore.schedule);
const deleteIndex = ref<number | null>(null);
const editModalIndex = ref<number | null>(null);
const editedActivity = ref<Activity>({ name: '' });
let deleteModal: any = null;
let editModal: any = null;
let logoutModal: any = null;

onMounted(() => {
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  editModal = new bootstrap.Modal(document.getElementById('editModal'));
  logoutModal = new bootstrap.Modal(document.getElementById('logoutModal'));
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark-mode');
  document.documentElement.style.transition = 'all 0.5s ease';
};

const toggleStar = (index: number, day: string) => {
  appStore.toggleStar(index, day);
};

const addActivity = () => {
  activities.value.push({ name: 'Nouvelle mission' });
  appStore.schedule.push({
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
  });
};

const confirmDelete = (index: number) => {
  deleteIndex.value = index;
  deleteModal?.show();
};

const deleteActivity = () => {
  if (deleteIndex.value !== null) {
    activities.value.splice(deleteIndex.value, 1);
    appStore.schedule.splice(deleteIndex.value, 1);
    deleteModal?.hide();
    deleteIndex.value = null;
  }
};

const showEditModal = (index: number) => {
  editModalIndex.value = index;
  editedActivity.value = { name: activities.value[index].name };
  editModal?.show();
};

const saveEditedActivity = () => {
  if (editModalIndex.value !== null) {
    activities.value[editModalIndex.value].name = editedActivity.value.name;
    editModal?.hide();
    editModalIndex.value = null;
  }
};

const showLogoutModal = () => {
  logoutModal?.show();
};

const logout = () => {
  // Implement your logout logic here
  logoutModal?.hide();
  router.push({ name: 'login' });
};
</script>

<style lang="scss">
:root {
  // Light mode variables
  --primary-color: #4CAF50;
  --secondary-color: #FF9800;
  --background-color: #f0f2f5;
  --card-bg: #ffffff;
  --text-color: #2c3e50;
  --border-color: #e0e0e0;
  --hover-color: #f5f5f5;
  --star-color: #FFD700;

  // Dark mode variables
  &.dark-mode {
    --primary-color: #66BB6A;
    --secondary-color: #FFA726;
    --background-color: #1a1f25;
    --card-bg: #2c3440;
    --text-color: #ecf0f1;
    --border-color: #404854;
    --hover-color: #3a424e;
  }
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.5s ease;
}

.theme-toggle-btn {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover {
    transform: translateY(-2px);
  }

  i {
    margin-right: 8px;
    font-size: 1.2rem;
  }
}

.schedule-card {
  background: var(--card-bg);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: none;
}

.table {
  margin-bottom: 0;

  thead tr {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;

    th {
      border: none;
      padding: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.9rem;
    }
  }

  tbody {
    tr {
      border-bottom: 2px solid var(--border-color);
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--hover-color);
        transform: scale(1.01);
      }
    }
  }
}

.day-cell {
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--hover-color);
    transform: scale(1.1);
  }

  &.has-star {
    color: var(--star-color);
    font-weight: bold;
    text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  }
}

.activity-name {
  font-weight: 600;
  color: var(--primary-color);
}

.action-btn {
  background: none;
  border: 2px solid;
  width: 35px;
  height: 35px;
  padding: 0;
  border-radius: 8px;
  transition: all 0.3s ease;

  &.edit-btn {
    border-color: var(--primary-color);
    color: var(--primary-color);

    &:hover {
      background: var(--primary-color);
      color: white;
    }
  }

  &.delete-btn {
    border-color: #ff5252;
    color: #ff5252;

    &:hover {
      background: #ff5252;
      color: white;
    }
  }
}

.fun-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &.add-btn {
    background: linear-gradient(45deg, var(--primary-color), #8BC34A);
    color: white;

    &:hover {
      transform: scale(1.05) rotate(-2deg);
    }
  }

  &.logout-btn {
    background: linear-gradient(45deg, #FF5252, #FF8A80);
    color: white;

    &:hover {
      transform: scale(1.05) rotate(2deg);
    }
  }
}

.modal-content {
  background: var(--card-bg);
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  .modal-header {
    border-bottom: 2px solid var(--border-color);
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: white;
    border-radius: 20px 20px 0 0;
  }

  .modal-footer {
    border-top: 2px solid var(--border-color);
  }
}

.form-control {
  background-color: var(--background-color);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  border-radius: 12px;
  padding: 0.8rem;
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(var(--primary-color), 0.2);
    border-color: var(--primary-color);
  }
}

.animate__animated {
  --animate-duration: 0.5s;
}

.animate__bounce {
  --animate-duration: 0.8s;
}
</style>