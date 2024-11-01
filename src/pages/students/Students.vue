<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Students"
        :rows="state.students"
        :columns="columns"
        row-key="cpf"
        class="col-12"
        :loading="state.loading"
        :filter-method="filterStudents"
        :filter="filter"
      >
        <template v-slot:top>
          <q-input filled dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Register Student"
            color="primary"
            icon="mdi-plus"
            @click.prevent="onAdd"
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
        @click.prevent="onAdd"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import {
  defineComponent, computed, watch, reactive, ref,
} from 'vue';

const columns = [
  {
    name: 'ra', align: 'left', label: 'RA', field: 'ra', sortable: true,
  },
  {
    name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true,
  },
  {
    name: 'email', align: 'left', label: 'E-mail', field: 'email', sortable: true,
  },
  {
    name: 'cpf', align: 'left', label: 'CPF', field: 'cpf', sortable: true,
  },
  {
    name: 'actions', align: 'right', label: '', field: 'actions', sortable: true,
  },
];

export default defineComponent({
  name: 'StudentsPage',
  props: {
    students: {
      required: true,
      type: Array,
    },
    loading: {
      required: true,
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const state = reactive({
      students: [],
      loading: true,
    });

    const studentsProps = computed(() => props.students);
    const loadingProps = computed(() => props.loading);

    watch(
      () => studentsProps,
      (studentsValue) => {
        state.students = studentsValue.value;
      },
      { deep: true },
    );

    watch(
      () => loadingProps,
      (loadingValue) => {
        state.loading = loadingValue.value;
      },
      { deep: true },
    );

    const handleEdit = (student) => emit('on-edit', student);

    const handleRemove = (student) => emit('on-remove', student);

    const onAdd = () => {
      emit('on-add');
    };

    const filter = ref('');

    const filterStudents = (array, fts) => {
      const ftsLowerCase = fts.toLowerCase();
      const regex = new RegExp(`${ftsLowerCase}`, 'gi');
      const filtered = array.filter((student) => student.ra.toString().match(regex)
        || student.name.toString().match(regex)
        || student.email.toString().match(regex)
        || student.cpf.toString().match(regex));
      return filtered;
    };

    return {
      columns,
      handleEdit,
      handleRemove,
      onAdd,
      state,
      filter,
      filterStudents,
    };
  },
});
</script>
