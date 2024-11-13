<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Connexion</h2>
            
            <form @submit.prevent="handleLogin">
              <div class="form-floating mb-3">
                <input 
                  type="email" 
                  class="form-control" 
                  id="email"
                  placeholder="nom@exemple.com"
                  v-model="email" 
                  required
                />
                <label for="email">Adresse email</label>
              </div>

              <div class="form-floating mb-3">
                <input 
                  type="password" 
                  class="form-control" 
                  id="password"
                  placeholder="Mot de passe"
                  v-model="password" 
                  required
                />
                <label for="password">Mot de passe</label>
              </div>

              <div class="form-check mb-3">
                <input 
                  type="checkbox" 
                  class="form-check-input" 
                  id="remember" 
                  v-model="rememberMe"
                />
                <label class="form-check-label" for="remember">
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
              <p class="mb-0">
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

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

    const handleLogin = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';
        
        const isValid = await authStore.login(email.value, password.value);
        
        if (isValid) {
          if (rememberMe.value) {
            // Implémenter la logique "Se souvenir de moi"
            localStorage.setItem('rememberMe', 'true');
          }
          router.push('/');
        }
      } catch (error) {
        errorMessage.value = error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue lors de la connexion';
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