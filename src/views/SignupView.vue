<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-sm border-0 rounded-3 bg-light">
          <div class="card-body p-4">
            <h2 class="text-center mb-4 text-primary">Let's Sign Up!</h2>
            
            <form @submit.prevent="handleSubmit">
              <div class="form-floating mb-3">
                <input 
                  type="text" 
                  class="form-control border-primary" 
                  id="name"
                  placeholder="Your Name"
                  v-model="name" 
                  required
                />
                <label for="name" class="text-muted">Full Name</label>
              </div>

              <div class="form-floating mb-3">
                <input 
                  type="email" 
                  class="form-control border-primary" 
                  id="email"
                  placeholder="your@email.com"
                  v-model="email" 
                  required
                />
                <label for="email" class="text-muted">Email Address</label>
              </div>

              <div class="form-floating mb-3">
                <input 
                  type="password" 
                  class="form-control border-primary" 
                  id="password"
                  placeholder="Your Password"
                  v-model="password"
                  required
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                />
                <label for="password" class="text-muted">Password</label>
                <div class="form-text text-muted">
                  Password must be at least 8 letters and numbers
                </div>
              </div>

              <div class="form-floating mb-3">
                <input 
                  type="password" 
                  class="form-control border-primary" 
                  :class="{ 'is-invalid': password !== confirmPassword }" 
                  id="confirmPassword"
                  placeholder="Confirm Your Password"
                  v-model="confirmPassword"
                  required
                />
                <label for="confirmPassword" class="text-muted">Confirm Password</label>
                <div class="invalid-feedback">
                  Passwords do not match
                </div>
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
                  {{ isLoading ? 'Signing Up...' : 'Sign Up' }}
                </button>
              </div>
            </form>

            <div class="text-center mt-3">
              <p class="mb-0 text-muted">
                Already signed up? 
                <router-link to="/login" class="text-primary text-decoration-none">
                  Log In
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
        errorMessage.value = 'Please fill in all the fields correctly!';
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
          : 'Oops, an error occurred!';
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

<style lang="scss">
.form-control {
  border-color: #5c6bc0;
  
  &:focus {
    border-color: #3949ab;
    box-shadow: 0 0 0 0.2rem rgba(92, 107, 192, 0.25);
  }

  &.is-invalid {
    border-color: #f44336;
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