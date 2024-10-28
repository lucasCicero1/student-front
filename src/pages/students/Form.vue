<template>
  <q-dialog v-model="propsShowModal">
    <q-card class="q-pa-xl" style="width: 900px; max-width: 90vw">
      <div class="row justify-center">
        <div class="col-12 text-center">
          <p class="text-h6">{{ state.isUpdate ? 'Update Student' : 'Register Student' }}</p>
        </div>
      </div>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <q-input
                autofocus
                label="Name"
                v-model="formState.name"
                :rules="[val => (val && val.length > 0) || 'Invalid name !']"
              />
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <q-input
                label="Email"
                v-model="formState.email"
                lazy-rules
                :rules="[val => (val && /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(val)) ||
                  'Invalid email!']"
                type="email"
              />
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <q-input
                label="CPF"
                v-model="formState.cpf"
                maxlength="11"
                lazy-rules
                :rules="[val => (val && val.length === 11) || 'Invalid CPF !']"
              />
            </div>
          </div>

          <div class="q-pt-md" align="right">
            <q-btn
              :label="state.isUpdate ? 'Update' : 'Save'"
              color="primary"
              class="q-gutter-x-xs"
              rounded
              type="submit"
              :disable="!validate(formState)"
            />
            <q-btn
              label="Cancel"
              color="primary"
              rounded
              flat
              type="reset"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-inner-loading
        :showing="state.loading"
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-card>
  </q-dialog>
</template>

<script>
import {
  defineComponent, computed, reactive, watch,
} from 'vue';
import useApi from 'src/composables/UseApi';
import useNotify from 'src/composables/UseNotify';

export default defineComponent({
  name: 'FormPage',
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
    student: {
      type: Object,
    },
  },

  setup(props, { emit }) {
    const { create } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    const formState = reactive({
      name: '',
      email: '',
      cpf: '',
    });

    const state = reactive({
      isUpdate: false,
      loading: false,
    });

    const validate = (form) => (form.name && /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email) && form.cpf.length === 11);
    const propsShowModal = computed(() => props.showModal);
    const propsStudent = computed(() => props.student);

    watch(
      () => propsStudent,
      (studentValue) => {
        formState.name = studentValue.value.name;
        formState.email = studentValue.value.email;
        formState.cpf = studentValue.value.cpf;
        state.isUpdate = true;
      },
      { deep: true },
    );

    const onSubmit = async () => {
      state.loading = true;
      try {
        const { data } = await create({ path: 'create/student', payload: formState });
        notifySuccess(data.message);
        emit('on-submit');
      } catch (error) {
        notifyError(error.message);
      } finally {
        state.loading = false;
      }
    };

    const onReset = () => emit('on-reset');

    return {
      formState,
      propsShowModal,
      validate,
      onSubmit,
      onReset,
      state,
    };
  },
});
</script>
