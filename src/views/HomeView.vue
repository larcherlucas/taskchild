<template>
  <div class="container py-4">
    <Header />

    <button @click="toggleDarkMode" class="btn btn-outline-primary mb-4 animate__animated animate__bounceIn">
      <i class="bi bi-moon-stars me-2"></i>
      Mode sombre
    </button>

    <div class="card shadow-sm mb-4 animate__animated animate__fadeIn">
      <div class="table-responsive">
        <table class="table table-hover mb-0 animate__animated animate__fadeIn">
          <thead class="table-light">
            <tr>
              <th>Activité</th>
              <th>Lundi</th>
              <th>Mardi</th>
              <th>Mercredi</th>
              <th>Jeudi</th>
              <th>Vendredi</th>
              <th>Samedi</th>
              <th>Dimanche</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(activity, index) in activities"
              :key="index"
              class="animate__animated animate__fadeInUp"
            >
              <td class="align-middle">{{ activity.name }}</td>
              <td
                v-for="day in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']"
                :key="day"
                @click="toggleStar(index, day)"
                :class="{ 'text-primary fw-bold': schedule[index][day].includes('⭐') }"
                class="align-middle text-center"
                style="cursor: pointer"
              >
                <span class="d-inline-block animate__animated animate__pulse" :style="`animation-delay: ${index * 0.1}s`">
                  {{ schedule[index][day] }}
                </span>
              </td>
              <td class="align-middle text-center">
                <div class="btn-group animate__animated animate__slideInRight">
                  <button
                    @click="showEditModal(index)"
                    class="btn btn-outline-primary btn-sm"
                    aria-label="Modifier l'activité"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Modifier"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    @click="confirmDelete(index)"
                    class="btn btn-outline-danger btn-sm"
                    aria-label="Supprimer l'activité"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Supprimer"
                  >
                    <i class="bi bi-trash"></i>
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
      <div class="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier l'activité</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="activityName" class="form-label">Nom de l'activité</label>
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
      <div class="modal-dialog modal-dialog-centered animate__animated animate__zoomIn">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmer la suppression</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer cette activité ?</p>
            <p class="text-muted mb-0">Cette action est irréversible.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-danger" @click="deleteActivity">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button @click="addActivity" class="btn btn-primary animate__animated animate__bounceIn">
        <i class="bi bi-plus-lg me-2"></i>
        Ajouter une activité
      </button>
      <button @click="logout" class="btn btn-danger animate__animated animate__bounceIn">
        <i class="bi bi-box-arrow-right me-2"></i>
        Se déconnecter
      </button>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Footer from '@/components/layout/Footer.vue';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import Header from '@/components/layout/Header.vue';

interface Activity {
  name: string;
}

const appStore = useAppStore();
const authStore = useAuthStore();
const router = useRouter();

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

// Initialisation des composants Bootstrap
onMounted(() => {
  // Initialiser les tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Initialiser les modales
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  editModal = new bootstrap.Modal(document.getElementById('editModal'));
});

const toggleStar = (index: number, day: string) => {
  appStore.toggleStar(index, day);
};

const addActivity = () => {
  activities.value.push({ name: 'Nouvelle activité' });
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

const editActivity = (index: number) => {
  showEditModal(index);
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark-mode');
  document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
};

</script>

<style lang="scss">
:root {
  &.dark-mode {
    --bs-body-bg: #212529;
    --bs-body-color: #f8f9fa;
    --bs-table-bg: #343a40;
    --bs-table-color: #f8f9fa;
    --bs-table-hover-bg: #495057;
    --bs-table-hover-color: #f8f9fa;
    --bs-card-bg: #343a40;
    --bs-card-color: #f8f9fa;
  }
}

.dark-mode {
  .table {
    --bs-table-bg: #343a40;
    --bs-table-color: #f8f9fa;
    --bs-table-hover-bg: #495057;
    --bs-table-hover-color: #f8f9fa;
    
    thead {
      --bs-table-bg: #212529;
      --bs-table-color: #f8f9fa;
    }
  }
  
  .card {
    background-color: #343a40;
    color: #f8f9fa;
  }
  
  .btn-outline-primary {
    color: #f8f9fa;
    border-color: #f8f9fa;
    
    &:hover {
      color: #212529;
      background-color: #f8f9fa;
    }
  }

  .modal-content {
    background-color: #343a40;
    color: #f8f9fa;
  }
  
  .modal-header {
    border-bottom-color: #495057;
    .btn-close {
      filter: invert(1) grayscale(100%) brightness(200%);
    }
  }
  
  .modal-footer {
    border-top-color: #495057;
  }

  .text-muted {
    color: #adb5bd !important;
  }
}

.btn-group {
  .btn {
    padding: 0.25rem 0.5rem;
    
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    i {
      font-size: 1rem;
    }
  }
}

.table > :not(caption) > * > * {
  padding: 1rem 0.75rem;
}

.tooltip {
  --bs-tooltip-bg: #343a40;
}
.animate__animated {
  --animate-duration: 0.5s;
}

.table {
  > :not(caption) > * > * {
    padding: 1rem 0.75rem;
  }

  .animate__animated {
    --animate-duration: 0.3s;
  }

  .animate__pulse {
    --animate-duration: 0.8s;
  }
}

.btn {
  &.animate__animated {
    --animate-duration: 0.6s;
  }
}

.modal {
  .modal-dialog {
    --animate-duration: 0.6s;
  }
}
</style>