<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Alunos"
        :rows="students"
        :columns="columns"
        row-key="cpf"
        class="col-12"
        :loading="loading"
      >
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import UseNotify from 'src/composables/UseNotify';
import useApi from 'src/composables/UseApi';

const columns = [
  {
    name: 'ra', align: 'left', label: 'RA', field: 'ra', sortable: true,
  },
  {
    name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true,
  },
  {
    name: 'email', align: 'left', label: 'E-mail', field: 'email', sortable: true,
  },
  {
    name: 'cpf', align: 'left', label: 'CPF', field: 'cpf', sortable: true,
  },
];

export default defineComponent({
  name: 'StudentsPage',

  setup() {
    const retrieveRoutePath = 'list/students';
    const students = ref([]);
    const loading = ref(true);
    const { list } = useApi();
    const { notifyError } = UseNotify();

    const listStudents = async () => {
      loading.value = true;
      try {
        const { data } = await list(retrieveRoutePath);
        if (data.length) students.value = data;
      } catch (error) {
        notifyError(error.message);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => listStudents());

    return {
      columns,
      students,
      loading,
    };
  },
});
</script>
