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
                  <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                  <div class="col-md-6">
                    <input v-model="email" type="email" class="form-control" autofocus>
                    <span v-if="errors.email != ''" role="alert">
                      <strong style="color:red">{{ errors.email }}</strong>
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="password" ref="papassword" class="col-md-4 col-form-label text-md-end">Password</label>
                  <div class="col-md-6">
                    <input v-model="password" type="password" class="form-control">
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
                      <strong style="color:red">{{ errorMessage}}</strong>
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
    const email = ref('');
    const password = ref('');
    const errors = reactive({ email: '', password: '' });
    const errorMessage = ref('');

    //llamadas al store 
    const token = computed(() => store.state.stApp.app.token);
    const username = computed(() => store.state.stApp.app.username);

    const validarUsuario = (params) => store.dispatch('stApp/validarUsuario', params);

    const login = async () => {
      errorMessage.value = '';
      if (!email.value) {
        errors.email = 'Please enter your email.';
        return;
      } else {
        errors.email = '';
      }
      if (!password.value) {
        errors.password = 'Please enter your password.';
        return;
      } else {
        errors.password = '';
      }
      try {
        await validarUsuario({email: email.value, password: password.value});
        //console.log('resultado', token.value, username.value)
        router.push({ name: 'students' });
      } catch (error) {
        console.error(error)
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage.value = error.response.data.message;
        } else {
          console.error(error)
          errorMessage.value = 'Error al iniciar sesión. Inténtelo de nuevo más tarde.';
        }
      }
    };

    return {
      email,
      password,
      errors,
      errorMessage,
      login,
      token
    };
  }
};
</script>

