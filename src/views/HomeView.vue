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
                  <label for="nickname" class="col-md-4 col-form-label text-md-end">nickname</label>
                  <div class="col-md-6">
                    <input id="nickname" v-model="nickname" type="nickname" class="form-control" autofocus autocomplete="nickname">
                    <span v-if="errors.nickname != ''" role="alert">
                      <strong style="color:red">{{ errors.nickname }}</strong>
                    </span>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="contra" class="col-md-4 col-form-label text-md-end">contra</label>
                  <div class="col-md-6">
                    <input id="contra" v-model="contra" type="contra" class="form-control" autocomplete="contra">
                    <span v-if="errors.contra" role="alert">
                      <strong style="color:red">{{ errors.contra }}</strong>
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
    const nickname = ref('');
    const contra = ref('');
    const errors = reactive({ nickname: '', contra: '' });
    const errorMessage = ref('');

    //llamadas al store
    const token = computed(() => store.state.stApp.app.token);
    const username = computed(() => store.state.stApp.app.username);

    const FcheckUser = (params) => store.dispatch('stApp/FcheckUser', params);

    // función para validar login
    const login = async () => {
      errorMessage.value = '';
      if (!nickname.value) {
        errors.nickname = 'Please enter your nickname.';
        return;
      } else {
        errors.nickname = '';
      }
      if (!contra.value) {
        errors.contra = 'Please enter your contra.';
        return;
      } else {
        errors.contra = '';
      }
      try {
        await FcheckUser({ nickname: nickname.value, contra: contra.value });
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
      nickname,
      contra,
      errors,
      errorMessage,
      login,
      token
    };
  }
};
</script>
