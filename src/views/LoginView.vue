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
                  type="email" 
                  class="form-control border-primary" 
                  id="email"
                  placeholder="nom@exemple.com"
                  v-model="email" 
                  required
                />
                <label for="email" class="text-muted">Adresse email</label>
              </div>

              <div class="form-floating mb-3">
                <input 
                  type="password" 
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

            <div class="text-center mt-3">
              <p class="mb-0 text-muted">
                Pas encore de compte? 
                <router-link to="/signup" class="text-primary text-decoration-none">
                  S'inscrire
                </router-link>
              </p>
            </div>

            <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="weeklyReportModal" tabindex="-1" aria-labelledby="weeklyReportModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="weeklyReportModalLabel">Chargement du tableau de la semaine</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
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
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Modal } from 'bootstrap';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const isLoading = ref(false);
    const errorMessage = ref('');

    onMounted(() => {
      const rememberMe = localStorage.getItem('rememberMe');
      if (rememberMe === 'true') {
        email.value = localStorage.getItem('email') || '';
        rememberMe.value = true;
      }
    });

    const handleLogin = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';

        const isValid = await authStore.login(email.value, password.value);

        if (isValid) {
          if (rememberMe.value) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('email', email.value);
          } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('email');
          }

          const weeklyReportModal = new Modal(document.getElementById('weeklyReportModal')!);
          weeklyReportModal.show();

          setTimeout(() => {
            weeklyReportModal.hide();
            router.push('/');
          }, 3000);
        }
      } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      rememberMe,
      isLoading,
      errorMessage,
      handleLogin,
    };
  },
});
</script>

<style lang="scss">
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
}
</style>