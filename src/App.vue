<script setup>
import {  RouterView } from 'vue-router'
</script>

<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="$store.state.stApp.app.token">
        <div class="container">
          <router-link class="navbar-brand" to="/students">CRUD</router-link>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <button class="btn btn-light" @click=" () =>{
                    $store.dispatch('stApp/Flogout')
                    $router.push({ name: 'login' });
                  }"> Log out </button>
              </li>
            </ul>
        </div>
      </nav>
  <RouterView />
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; 
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    return {
      store,
      router,
      getUser
    };
  }
};
</script>
