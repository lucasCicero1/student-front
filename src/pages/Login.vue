<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-5 text-center">
        Login
      </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          type="email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email is required!']"
        />
        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length >= 2) ||
            'Password is required and with 6 characteres !']"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            flat
            size="sm"
            to="/signup"
          />

          <q-btn
            label="Forgot Password"
            color="primary"
            class="full-width"
            flat
            size="sm"
            :to="{ name: 'forgot-password' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const form = ref({
      // email: '',
      // password: ''
      email: 'teste@mail.com',
      password: '123456',
    });

    const handleLogin = async () => {
      try {
        // router.push({ name: 'me' });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
