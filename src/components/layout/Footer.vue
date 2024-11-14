<template>
  <footer class="footer mt-5 py-4">
    <div class="container">
      <!-- Ballon animé -->
      <div class="text-center mb-4">
        <transition name="balloon">
          <span
            role="button"
            tabindex="0"
            class="balloon-emoji"
            :class="{ 'balloon-move': balloonMove }"
            @click="handleBalloonClick"
            @keypress.enter="handleBalloonClick"
          >
            🎈
          </span>
        </transition>

        <!-- Message secret -->
        <div v-if="showSecret" class="secret-message">
          <p class="text-primary">
            Tu as trouvé le ballon secret ! Continue comme ça ! 🌟
          </p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="footer-nav" aria-label="Navigation du footer">
        <div class="row justify-content-center text-center">
          <div class="col-12 col-sm-4 mb-3">
            <button class="btn btn-link footer-link" @click="showRulesModal">
              <i class="bi bi-journal-text me-2"></i>
              Règles du jeu
            </button>
          </div>
          <div class="col-12 col-sm-4 mb-3">
            <button class="btn btn-link footer-link" @click="showRewardsModal">
              <i class="bi bi-trophy me-2"></i>
              Récompenses
            </button>
          </div>
          <div class="col-12 col-sm-4 mb-3">
            <button class="btn btn-link footer-link" @click="showParentsModal">
              <i class="bi bi-people me-2"></i>
              Parents
            </button>
          </div>
        </div>
      </nav>

      <!-- Message de copyright -->
      <div class="text-center mt-4">
        <p class="text-muted small">
          <i class="bi bi-heart-fill text-danger me-2"></i>
          Fait avec amour pour que tu t'amuses en accomplissant tes objectifs !
        </p>
      </div>
    </div>

    <!-- Modal Règles -->
    <div class="modal fade" id="rulesModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Règles du jeu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Tu dois avoir des étoiles et tu pourras choisir une récompense !</p>
            <ul>
              <li>Accomplis tes tâches quotidiennes</li>
              <li>Sois sage et respectueux</li>
              <li>Aide ta famille</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">D'accord</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Récompenses -->
    <div class="modal fade" id="rewardsModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tes récompenses</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Récompense</th>
                    <th>Étoiles nécessaires</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(reward, index) in rewards" :key="index">
                    <td>
                      <input 
                        v-if="reward.editing" 
                        v-model="reward.name" 
                        class="form-control"
                        @keyup.enter="saveReward(index)"
                      />
                      <span v-else>{{ reward.name }}</span>
                    </td>
                    <td>
                      <input 
                        v-if="reward.editing" 
                        v-model.number="reward.stars" 
                        type="number" 
                        class="form-control"
                        min="1"
                      />
                      <span v-else>{{ reward.stars }}</span>
                    </td>
                    <td>
                      <div class="btn-group">
                        <button 
                          v-if="reward.editing"
                          @click="saveReward(index)" 
                          class="btn btn-success btn-sm"
                        >
                          <i class="bi bi-check"></i>
                        </button>
                        <button 
                          v-else
                          @click="editReward(index)" 
                          class="btn btn-primary btn-sm"
                        >
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button 
                          @click="deleteReward(index)" 
                          class="btn btn-danger btn-sm"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3">
              <button @click="addReward" class="btn btn-primary">
                <i class="bi bi-plus-lg me-2"></i>Ajouter une récompense
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Parents -->
    <div class="modal fade" id="parentsModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Section Parents</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">
              <i class="bi bi-lock-fill me-2"></i>
              Ce sont les maîtres du jeu... chut ! 🤫
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">D'accord</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Reward {
name: string;
stars: number;
editing: boolean;
}

const showSecret = ref(false);
const balloonMove = ref(false);
let modals = {
rules: null as any,
rewards: null as any,
parents: null as any
};

const rewards = ref<Reward[]>([
{ name: "1h de jeux vidéo", stars: 10, editing: false },
{ name: "Sortie au parc", stars: 20, editing: false },
{ name: "Film au choix", stars: 15, editing: false }
]);

onMounted(() => {
// Initialiser les modales Bootstrap
modals.rules = new bootstrap.Modal(document.getElementById('rulesModal'));
modals.rewards = new bootstrap.Modal(document.getElementById('rewardsModal'));
modals.parents = new bootstrap.Modal(document.getElementById('parentsModal'));
});
const hideBalloon = ref(false); 

const handleBalloonClick = () => {
  showSecret.value = true;
  balloonMove.value = true; 
  setTimeout(() => {
    hideBalloon.value = true; 
    setTimeout(() => {
      showSecret.value = false;
      hideBalloon.value = false; 
      balloonMove.value = false; 
    }, 1000); 
  }, 3000); 
};

const showRulesModal = () => {
modals.rules?.show();
};

const showRewardsModal = () => {
modals.rewards?.show();
};

const showParentsModal = () => {
modals.parents?.show();
};

const addReward = () => {
rewards.value.push({
  name: "Nouvelle récompense",
  stars: 1,
  editing: true
});
};

const editReward = (index: number) => {
rewards.value[index].editing = true;
};

const saveReward = (index: number) => {
const reward = rewards.value[index];
if (reward.name.trim() && reward.stars > 0) {
  reward.editing = false;
}
};

const deleteReward = (index: number) => {
if (confirm('Es-tu sûr de vouloir supprimer cette récompense ?')) {
  rewards.value.splice(index, 1);
}
};
</script>

<style scoped>
.footer {
background: linear-gradient(180deg, transparent 0%, rgba(var(--bs-primary-rgb), 0.1) 100%);
}

.balloon-emoji {
font-size: 2rem;
cursor: pointer;
display: inline-block;
transition: all 0.5s ease;
}

.balloon-emoji:hover {
transform: translateY(-10px);
}

.balloon-move {
animation: floatBalloon 2s ease-in-out infinite;
}

.footer-link {
color: var(--bs-primary);
text-decoration: none;
transition: all 0.3s ease;
}

.footer-link:hover {
transform: scale(1.1);
color: var(--bs-primary-darker);
}

.secret-message {
animation: fadeInUp 0.5s ease-out;
}

.btn-group .btn {
padding: 0.25rem 0.5rem;
}

.table input {
min-width: 100px;
}

@keyframes floatBalloon {
0%, 100% { transform: translateY(0) rotate(0); }
50% { transform: translateY(-15px) rotate(5deg); }
}

@keyframes fadeInUp {
from {
  opacity: 0;
  transform: translateY(20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
}

/* Modern Dark Mode */
:root.dark-mode {
  .modal-content {
    background-color: #2b2f33; 
    color: #e1e4e8; 
  }

  .modal-header,
  .modal-footer {
    border-color: #444b52; 
  }

  .btn-close {
    filter: invert(1) grayscale(100%) brightness(200%);
  }

  .footer {
    background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.07) 100%);
  }

  .footer-link {
    color: #a8c0e0;
    transition: color 0.3s ease, transform 0.2s ease;
    
    &:hover {
      color: #5b9bd5;
      transform: scale(1.1);
    }
  }

  .balloon-emoji {
    color: #ffb3c1; 
  }

  .text-muted {
    color: #8c96a1; 
  }
}

</style>