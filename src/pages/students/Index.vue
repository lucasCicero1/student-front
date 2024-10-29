<template>
  <q-page>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <students
            @on-add="onAdd"
            @on-edit="onEdit"
            :students="state.students"
            :loading="state.loading"
            @on-remove="onRemove"
          />
        </div>
      </div>
    </q-card-section>

    <form-student
      :showModal="state.showModal"
      @on-submit="onSubmit"
      @on-reset="onReset"
      :student="state.student"
      :isUpdate="state.isUpdate"
    >
    </form-student>
  </q-page>
</template>

<script>
import {
  defineComponent, reactive, onMounted,
} from 'vue';
import { useQuasar } from 'quasar';
import useApi from 'src/composables/UseApi';
import useNotify from 'src/composables/UseNotify';
import Students from './Students.vue';
import FormStudent from './Form.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    Students,
    FormStudent,
  },
  setup() {
    const { list, remove } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const $q = useQuasar();

    const state = reactive({
      showModal: false,
      student: {},
      students: [],
      loading: true,
      isUpdate: false,
    });

    const onAdd = () => {
      state.showModal = !state.showModal;
      state.isUpdate = false;
    };

    const onEdit = (student) => {
      state.student = student;
      state.showModal = !state.showModal;
      state.isUpdate = true;
    };

    const onReset = () => {
      state.showModal = !state.showModal;
      state.student = {};
    };

    const listStudents = async () => {
      state.loading = true;
      try {
        const { data } = await list({ path: 'list/students' });
        if (data.length) state.students = data;
      } catch (error) {
        notifyError(error.message);
      } finally {
        state.loading = false;
      }
    };

    onMounted(() => listStudents());

    const onSubmit = () => {
      state.showModal = !state.showModal;
      listStudents();
      state.student = {};
    };

    const handleRemove = async (student) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `<span>Do you really want to delete student <strong>${student.name}</strong> ?</span>`,
          html: true,
          cancel: {
            color: 'negative',
          },
          persistent: true,
        }).onOk(async () => {
          await remove({ path: 'delete/student', payload: student });
          notifySuccess(`Student ${student.name} was deleted successfully.`);
          await listStudents();
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const onRemove = async (student) => {
      await handleRemove(student);
    };

    return {
      onAdd,
      state,
      onEdit,
      onSubmit,
      onReset,
      onRemove,
    };
  },
});
</script>
