<template>
  <br><br>
  <main>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Iniciar Sesión</div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="row mb-3">
                  <label for="user" class="col-md-4 col-form-label text-md-end">User</label>
                  <div class="col-md-6">
                    <input id="user" v-model="user" type="user" class="form-control" autofocus autocomplete="user">
                    <span v-if="errors.user != ''" role="alert">
                      <strong style="color:red">{{ errors.user }}</strong>
                    </span>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                  <div class="col-md-6">
                    <input id="password" v-model="password" type="password" class="form-control" autocomplete="password">
                    <span v-if="errors.password" role="alert">
                      <strong style="color:red">{{ errors.password }}</strong>
                    </span>
                  </div>
                </div>
                <div class="row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">
                      Login
                    </button>
                    <br>
                    <span v-if="errorMessage" role="alert">
                      <strong style="color:red">{{ errorMessage }}</strong>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = ref('');
    const password = ref('');
    const errors = reactive({ user: '', password: '' });
    const errorMessage = ref('');

    //llamadas al store
    const token = computed(() => store.state.stApp.app.token);
    const username = computed(() => store.state.stApp.app.username);

    const validarUsuario = (params) => store.dispatch('stApp/validarUsuario', params);

    // función para validar login
    const login = async () => {
      errorMessage.value = '';
      if (!user.value) {
        errors.user = 'Please enter your user.';
        return;
      } else {
        errors.user = '';
      }
      if (!password.value) {
        errors.password = 'Please enter your password.';
        return;
      } else {
        errors.password = '';
      }
      try {
        await validarUsuario({ user: user.value, password: password.value });
        if (token.value)
          router.push({ name: 'students' })
        else
          errorMessage.value = 'Usuario o contraseña incorrectos. Inténtelo de nuevo.'
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage.value = error.response.data.message;
        } else {
          errorMessage.value = 'Error al iniciar sesión. Inténtelo de nuevo más tarde.'
        }
      }
    };

    return {
      user,
      password,
      errors,
      errorMessage,
      login,
      token
    };
  }
};
</script>
