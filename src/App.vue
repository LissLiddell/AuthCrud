<script setup>
import {  RouterView } from 'vue-router'
</script>

<template>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="$store.state.stApp.app.sesionActiva">
        <div class="container">
          <router-link class="navbar-brand" to="/students">Students</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <!-- <h4> Bienvenido, {{ usuario.nombre }}</h4> -->
                <router-link class="nav-link" to="/students" style="color: azure;"> Usuario: {{ $store.state.stApp.app.username }} </router-link>
              </li>
              <li class="nav-item">
                <!-- <h4> Bienvenido, {{ usuario.nombre }}</h4> -->
                <button class="nav-link" @click=" () =>{
                    $store.dispatch('stApp/cerrarSesion')
                    $router.push({ name: 'login' });
                  }" style="color: azure;"> Cerrar Sesion </button>
                  <!-- {{ $store.state.stApp.app.sesionActiva }} -->
              </li>
            </ul>
          </div>
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
      router
    };
  }
};
</script>
