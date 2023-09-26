<template>
  <v-card
    v-if="!isLoggedIn"
    class='mx-auto px-6 py-8'
    max-width='500'
    rendered='false'
  >
    Por favor, inicia sesión
  </v-card>

  <v-container
    v-else
    class="bg-surface-variant mb-2"
    fluid
  >
    <v-row>
        <v-col
          cols='5'
        >
            <TablaUsuario />
        </v-col>
        <v-col
          cols='7'
        >
            <TablaLaboratorio /> 
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import TablaUsuario from '@/components/TablaMaterialesUsuario.vue';
  import TablaLaboratorio from '@/components/TablaMaterialesLaboratorio.vue';
  import { computed } from 'vue';
  import { useAppStore } from '@/store/app';

  const store = useAppStore();
  const isLoggedIn = computed(() => store.isLoggedIn);
</script>
