<template>
  <q-layout view="lHh Lpr lFf" class="bg-blue-grey-1">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Educational Institution Interface
        </q-toolbar-title>

        <q-btn-dropdown flat icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
    >
      <q-list bordered separator>
        <q-item-label
          header
        >
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import EssentialLink from 'components/EssentialLink.vue';
import useAuthUser from 'src/composables/UseAuthUser';
import { useAuthStore } from '../stores/auth-store';

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    routeName: 'me',
  },
  {
    title: 'Alunos',
    caption: '',
    icon: 'school',
    routeName: 'students',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const { logout } = useAuthUser();

    const $q = useQuasar();
    const authStore = useAuthStore();

    const handleLogout = async () => {
      $q.dialog({
        title: 'Logout',
        message: 'Do you really want to leave ?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        authStore.logout();
        router.replace({ name: 'login' });
      });
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
    };
  },
});
</script>
