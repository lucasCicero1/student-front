import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = async (message) => {
    $q.notify({
      type: 'positive',
      message,
      position: 'top-right',
    });
  };

  const notifyError = async (message) => {
    $q.notify({
      type: 'negative',
      message,
      position: 'top-right',
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
