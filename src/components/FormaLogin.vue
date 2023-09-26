<template>
  <v-card
    class='mx-auto px-6 py-8'
    max-width='500'
    rendered='false'
  >
    <div
      v-if="isLoggedIn"
    >
      Has iniciado sesión correctamente
    </div>

    <v-form
      v-else
      v-model='validForm'
      @submit.prevent='onSubmit'
    >
      <h2
        class='mb-5'
      >
        Iniciar sesión
      </h2>

      <v-text-field
        v-model='email'
        :readonly='loading'
        :rules='[rules.notBlank, rules.email]'
        type='email'
        label='Correo electrónico'
        placeholder='@uabc.edu.mx'
        variant='outlined'
        class='mb-5'
      ></v-text-field>

      <v-text-field
        v-model='password'
        :readonly='loading'
        :rules='[rules.notBlank]'
        type='password'
        label='Contraseña'
        variant='outlined'
        class='mb-5'
      ></v-text-field>

      <v-btn
        type='submit'
        block
        :disabled='!validForm'
        :loading='loading'
        :color='btnColor'
      >
        Iniciar sesión
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useAppStore } from '../store/app';
  import router from '@/router';

  const email = ref(null);
  const password = ref(null);
  const validForm = ref(false);
  const loading = ref(false);
  const btnColor = ref('default');
  const store = useAppStore();
  const isLoggedIn = computed(() => store.isLoggedIn);

  const rules = {
    email: (email) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email) ? true : 'No es un correo válido';
    },
    notBlank: (value) => value ? true : 'Campo requerido',
  }

  function onSubmit() {
    const user = {
      email: email.value,
      password: password.value
    };

    loading.value = true;
    setTimeout(() => {
      fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(isValidUser => {
          loading.value = false;
          onValidation(isValidUser)
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000); 
  }

  function onValidation(isValidUser) {
    store.changeStatus(isValidUser);

    if (isValidUser) {
      btnColor.value = 'sucess';
      router.push('pedirMaterial');
    }
    else {
      btnColor.value = 'error';
    }
  }

</script>