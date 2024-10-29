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
          :rules="[val => (val && /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(val)) || 'Invalid email !']"
        />
        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length >= 5) ||
            'Password is required and with 5 characteres !']"
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
            :disable="!validate(form)"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth-store';
import useAuthUser from '../composables/UseAuthUser';
import useNotify from '../composables/UseNotify';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const router = useRouter();
    const { login } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      email: 'admin@mail.com',
      password: 'admin',
    });

    const authStore = useAuthStore();

    const handleLogin = async () => {
      try {
        const { accessToken, username } = await login(form.value);
        authStore.setToken(accessToken);
        authStore.setUser(username);
        router.push({ name: 'me' });
        notifySuccess('Loggin successfully !');
      } catch (error) {
        notifyError(error?.message ?? 'UnhandledError');
      }
    };

    const validate = (data) => (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(data.email) && data.password.length >= 5);

    return {
      form,
      handleLogin,
      validate,
    };
  },
});
</script>
