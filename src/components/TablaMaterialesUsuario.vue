<template>
  <v-container
    class='ma-0'
  >
    <v-row
      class='mb-2'
    >
      <v-data-table
        :headers='headers'
        :items='materialesSolicitados'
        :sort-by="[{ key: 'nombre', order: 'asc' }]"
        fixed-header
      >
        <template v-slot:top>
          <v-toolbar
            flat
            title='Materiales solicitados' 
          >
            <v-divider
              class='mx-5'
              inset
              vertical />
            <v-spacer />
            <v-dialog
              v-model='dialog'
              max-width='500px'
            >
              <template v-slot:activator='{ props }'>
                <v-btn
                  color='primary'
                  dark
                  class='mb-2'
                  v-bind='props'
                >
                  Solicitar material
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class='text-h5'>Nuevo préstamo</span>
                </v-card-title>
                <v-card-text>
                  <v-form
                    v-model='validForm'
                  >
                    <v-select
                      label='Material'
                      :items='materiales'
                      v-model='selectedMaterial'
                      item-title='nombre'
                      :rules='[rules.notBlank]'
                      clearable
                      return-object />

                    <v-text-field
                      label='Cantidad'
                      :rules='[rules.checkQty]'
                      v-model='cantSelected'
                      :disabled='!selectedMaterial'
                      min='1'
                      type='number' />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color='blue-darken-1'
                    variant='text'
                    @click='close'
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    color='blue-darken-1'
                    variant='text'
                    :disabled='!validForm'
                    @click='agregarMaterial'
                  >
                    Aceptar
                  </v-btn>
                </v-card-actions>
              </v-card>

            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:no-data>
          No hay materiales solicitados
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            size="small"
            @click="eliminarMaterial(item.raw)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-row>
    <v-row>
      <v-btn
        @click='onSubmitPrestamo'
        :disabled='materialesSolicitados.length == 0'
      >
        Enviar préstamo
      </v-btn>
    </v-row>
  </v-container>
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
      title: 'Unidades solicitadas',
      key: 'cant'
    },
    {
      title: 'Acciones',
      key: 'actions',
      sortable: false
    }
  ]);
  const dialog = ref(false);
  const cantSelected = ref();
  const selectedMaterial = ref(null);
  const validForm = ref(false);
  const materialesSolicitados = ref([]);
  const rules = {
    notBlank: (value) => value ? true : 'Campo requerido',
    checkQty: (qty) => {
      if (selectedMaterial.value != null) {
        return qty > 0 && qty <= selectedMaterial.value.unidades_disponibles;
      }
      else {
        return false;
      }
    },
  }
  
  onMounted(initializeDataTable);

  const close = () => {
    dialog.value = false;
  }

  const agregarMaterial = () => {
    dialog.value = false;

    const material = {
      id: selectedMaterial.value.id,
      nombre: selectedMaterial.value.nombre,
      cant: cantSelected.value
    };

    materialesSolicitados.value.push(material);
    selectedMaterial.value = null;
    cantSelected.value = null;
  }

  const eliminarMaterial = (item) => {
    let itemIndex = materialesSolicitados.value.indexOf(item);
    materialesSolicitados.value.splice(itemIndex, 1);  
  }

  const onSubmitPrestamo = () => {
    materialesSolicitados.value = [];
  }  

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