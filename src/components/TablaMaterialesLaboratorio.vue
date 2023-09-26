<template>
  <div>
    <v-data-table
      :headers='headers'
      :items='materiales'
      :sort-by="[{ key: 'nombre', order: 'asc' }]"
      fixed-header
    >
      <template v-slot:top>
        <v-toolbar
          flat
          title='Lista de materiales' />
      </template>

      <template v-slot:no-data>
        No se pudo obtener la lista de materiales
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const materiales = ref([]);
  const headers = ref([
    {
      title: 'Nombre',
      key: 'nombre'
    },
    {
      title: 'Descripción',
      key: 'descripcion',
    },
    {
      title: 'Unidades disponibles',
      key: 'unidades_disponibles'
    },
  ]);
  
  onMounted(initializeDataTable);

  function initializeDataTable() {
    fetch('http://localhost:3001/materiales', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        materiales.value = json;
      })
      .catch(err => {
        console.log(err);
      });
  }

</script>