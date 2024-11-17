<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-sm border-0 rounded-3 bg-light">
          <div class="card-body p-4">
            <h2 class="text-center mb-4 text-primary">Connexion</h2>
            
            <form @submit.prevent="handleLogin">
              <div class="form-floating mb-3">
                <input 
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control border-primary" 
                  id="password"
                  placeholder="Mot de passe"
                  v-model="password" 
                  required
                />
                <label for="password" class="text-muted">Mot de passe</label>
              </div>

              <div class="form-check mb-3">
                <input 
                  type="checkbox"
                  class="form-check-input"
                  id="showPass"
                  v-model="showPassword"
                />
                <label class="form-check-label text-muted" for="showPass">
                  Afficher le mot de passe
                </label>
              </div>

              <div class="form-check mb-3">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="remember" 
                  v-model="rememberMe"
                />
                <label class="form-check-label text-muted" for="remember">
                  Se souvenir de moi
                </label>
              </div>

              <div class="d-grid gap-2">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg"
                  :disabled="isLoading"
                >
                  <span 
                    v-if="isLoading" 
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  {{ isLoading ? 'Connexion...' : 'Se connecter' }}
                </button>
              </div>
            </form>

            <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modale de sécurité -->
  <div class="modal fade" id="securityModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Information de Sécurité</h5>
          <button type="button" class="btn-close" @click="closeSecurityModal"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning">
            <div class="text-container position-relative">
              <p class="warning-text mb-3" :class="{ 'fade-out': !isMessageVisible }">
                Ceci n'est pas une app sécurisée, ne met aucunes informations sensibles et utilise le mot de passe suivant:
              </p>
              <p class="alternate-text mb-3" :class="{ 'fade-in': !isMessageVisible }">
                You Do It
              </p>
            </div>
            
            <div class="form-check mb-3">
              <input 
                type="checkbox"
                class="form-check-input"
                id="showModalPass"
                v-model="showModalPassword"
              />
              <label class="form-check-label" for="showModalPass">
                Afficher le mot de passe
              </label>
            </div>

            <h3 class="mt-2 text-center">
              {{ showModalPassword ? 'VueEstLeMaitreDuFront' : '••••••••••••••••••' }}
            </h3>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeSecurityModal">
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modale de chargement -->
  <div class="modal fade" id="loadingModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chargement en cours</h5>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Chargement...</span>
            </div>
          </div>
          <p class="text-center mt-3 text-muted">Veuillez patienter pendant le chargement...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter();
    
    const password = ref('');
    const rememberMe = ref(false);
    const isLoading = ref(false);
    const errorMessage = ref('');
    const showPassword = ref(false);
    const showModalPassword = ref(false);
    const isMessageVisible = ref(true);
    
    let securityModal: Modal | null = null;
    let loadingModal: Modal | null = null;
    let fadeInterval: number | null = null;

    const showSecurityModal = () => {
      const modalEl = document.getElementById('securityModal');
      if (modalEl) {
        securityModal = new Modal(modalEl, {
          backdrop: 'static',
          keyboard: false
        });
        securityModal.show();
      }
    };

    const closeSecurityModal = () => {
      if (securityModal) {
        securityModal.hide();
      }
    };

    const showLoadingModal = () => {
      const modalEl = document.getElementById('loadingModal');
      if (modalEl) {
        loadingModal = new Modal(modalEl, {
          backdrop: 'static',
          keyboard: false
        });
        loadingModal.show();
      }
    };

    const handleLogin = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';
        
        // Simuler la vérification du mot de passe
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (password.value === 'VueEstLeMaitreDuFront') {
          if (rememberMe.value) {
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberMe');
          }
          
          // Afficher la modale de chargement
          showLoadingModal();
          
          // Simuler un chargement
          setTimeout(() => {
            if (loadingModal) {
              loadingModal.hide();
            }
            router.push('/');
          }, 3000);
        } else {
          errorMessage.value = 'Mot de passe incorrect';
        }
      } catch (error) {
        errorMessage.value = 'Une erreur est survenue';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      showSecurityModal();
      fadeInterval = window.setInterval(() => {
        isMessageVisible.value = !isMessageVisible.value;
      }, 3000);

      const rememberMeValue = localStorage.getItem('rememberMe');
      if (rememberMeValue === 'true') {
        rememberMe.value = true;
      }
    });

    onUnmounted(() => {
      if (fadeInterval) {
        clearInterval(fadeInterval);
      }
    });

    return {
      password,
      rememberMe,
      isLoading,
      errorMessage,
      showPassword,
      showModalPassword,
      isMessageVisible,
      handleLogin,
      closeSecurityModal
    };
  }
});
</script>

<style lang="scss">
.text-container {
  position: relative;
  height: 48px;
}

.warning-text,
.alternate-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: opacity 1.5s ease-in-out;
  margin: 0;
}

.warning-text {
  opacity: 1;
  
  &.fade-out {
    opacity: 0;
  }
}

.alternate-text {
  opacity: 0;
  color: #664d03;
  font-weight: bold;
  
  &.fade-in {
    opacity: 1;
  }
}

.form-control {
  border-color: #5c6bc0;
  
  &:focus {
    border-color: #3949ab;
    box-shadow: 0 0 0 0.2rem rgba(92, 107, 192, 0.25);
  }
}

.btn-primary {
  background-color: #5c6bc0;
  border-color: #5c6bc0;

  &:hover {
    background-color: #3949ab;
    border-color: #3949ab;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.modal-content {
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffecb5;
  color: #664d03;
}
</style>