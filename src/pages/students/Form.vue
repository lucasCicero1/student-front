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
                :disable="state.isUpdate"
              />
            </div>
            <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" v-if="state.isUpdate">
              <q-input
                label="RA"
                v-model="formState.ra"
                :disable="true"
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
    isUpdate: {
      required: true,
      type: Boolean,
    },
  },

  setup(props, { emit }) {
    const { create, update } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    const formState = reactive({
      name: '',
      email: '',
      cpf: '',
      ra: '',
    });

    const state = reactive({
      isUpdate: false,
      loading: false,
    });

    const validate = (form) => (form.name && /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email) && form.cpf.length === 11);
    const propsShowModal = computed(() => props.showModal);
    const propsStudent = computed(() => props.student);
    const propsIsUpdate = computed(() => props.isUpdate);

    watch(
      () => propsStudent,
      (studentValue) => {
        formState.name = studentValue.value.name;
        formState.email = studentValue.value.email;
        formState.cpf = studentValue.value.cpf;
        formState.ra = studentValue.value.ra;
      },
      { deep: true },
    );

    watch(
      () => propsIsUpdate,
      (isUpdateValue) => {
        state.isUpdate = isUpdateValue.value;
      },
      { deep: true },
    );

    const onSubmit = async () => {
      state.loading = true;
      try {
        state.isUpdate
          ? await update({ path: 'update/student', payload: formState })
          : await create({ path: 'create/student', payload: formState });
        notifySuccess(`Student was ${state.isUpdate ? 'updated' : 'created'} successfully.`);
        emit('on-submit');
      } catch (error) {
        notifyError(error.data.error || `Unable to save Student: ${formState.name}`);
      } finally {
        state.loading = false;
      }
    };

    const onReset = () => {
      emit('on-reset');
    };

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
