<template>
  <q-page>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <students
            @on-add="onAdd"
            @on-edit="onEdit"
          />
        </div>
      </div>
    </q-card-section>

    <form-student
      :showModal="state.showModal"
      @on-submit="state.showModal = false"
      @on-reset="state.showModal = false"
      :student="state.student"
    >
    </form-student>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import Students from './Students.vue';
import FormStudent from './Form.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    Students,
    FormStudent,
  },
  setup() {
    const state = reactive({
      showModal: false,
      student: {},
    });

    const onAdd = () => {
      state.showModal = !state.showModal;
    };

    const onEdit = (student) => {
      state.student = student;
      state.showModal = !state.showModal;
    };

    return {
      onAdd,
      state,
      onEdit,
    };
  },
});
</script>
