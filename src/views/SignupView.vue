<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Inscription</h2>
            
            <form @submit.prevent="handleSubmit">
              <div class="form-floating mb-3">
                <input 
                  type="text" 
                  class="form-control" 
                  id="name"
                  placeholder="Votre nom"
                  v-model="name" 
                  required
                />
                <label for="name">Nom complet</label>
              </div>

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
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                />
                <label for="password">Mot de passe</label>
                <div class="form-text">
                  Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre
                </div>
              </div>

              <div class="form-floating mb-3">
                <input 
                  type="password" 
                  class="form-control" 
                  id="confirmPassword"
                  placeholder="Confirmez le mot de passe"
                  v-model="confirmPassword"
                  required
                />
                <label for="confirmPassword">Confirmer le mot de passe</label>
              </div>

              <div class="d-grid gap-2">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg"
                  :disabled="isLoading || !isFormValid"
                >
                  <span 
                    v-if="isLoading" 
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  {{ isLoading ? 'Inscription...' : 'S\'inscrire' }}
                </button>
              </div>
            </form>

            <div class="text-center mt-3">
              <p class="mb-0">
                Déjà inscrit? 
                <router-link to="/login" class="text-primary text-decoration-none">
                  Se connecter
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
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'SignupView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const isLoading = ref(false);
    const errorMessage = ref('');

    const isFormValid = computed(() => {
      return (
        name.value.length > 0 &&
        email.value.length > 0 &&
        password.value.length >= 8 &&
        password.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) &&
        password.value === confirmPassword.value
      );
    });

    const handleSubmit = async () => {
      if (!isFormValid.value) {
        errorMessage.value = 'Veuillez remplir correctement tous les champs';
        return;
      }

      try {
        isLoading.value = true;
        errorMessage.value = '';
        
        await authStore.signup(email.value, password.value, name.value);
        router.push('/login');
      } catch (error) {
        errorMessage.value = error instanceof Error 
          ? error.message 
          : 'Une erreur est survenue lors de l\'inscription';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      isLoading,
      errorMessage,
      isFormValid,
      handleSubmit,
    };
  },
});
</script>