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
    const { list } = useApi();
    const { notifyError } = useNotify();

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

    return {
      onAdd,
      state,
      onEdit,
      onSubmit,
      onReset,
    };
  },
});
</script>
