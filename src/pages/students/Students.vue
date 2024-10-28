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
        <template v-slot:top>
          <span class="text-h6">Alunos</span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Cadastrar Aluno"
            color="primary"
            icon="mdi-plus"
            :to="{ name: 'form-students' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip>
                Editar
              </q-tooltip>
            </q-btn>
            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense
              size="sm"
              @click="handleRemove(props.row)"
            >
              <q-tooltip>
                Deletar
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-students' }"
      />
    </q-page-sticky>
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
  {
    name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: true,
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

    const handleEdit = () => {};

    const handleRemove = () => {};

    return {
      columns,
      students,
      loading,
      handleEdit,
      handleRemove,
    };
  },
});
</script>
