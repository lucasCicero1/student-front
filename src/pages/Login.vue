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
      email: 'teste@mail.com',
      password: '123456',
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

    return {
      form,
      handleLogin,
    };
  },
});
</script>
