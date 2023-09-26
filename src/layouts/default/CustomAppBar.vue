<template>
  <v-app-bar
    color="primary"
    prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
    <v-toolbar-title>
      Presta
    </v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
  >
    <v-list-item
      title="Menú"
    ></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item @click="$router.push('login')"
        prepend-icon="mdi-view-dashboard"
        title="Iniciar sesión"
      ></v-list-item>

      <v-list-item @click="$router.push('pedirMaterial')"
        prepend-icon="mdi-table"
        title="Solicitar material"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { ref } from 'vue';

  const drawer = ref(false);
</script>
