/* eslint-disable no-unused-vars */
import { ref } from 'vue';
import { api as http } from '../boot/axios';

const user = ref({
  loggedIn: false,
  username: null,
});

export default function useAuthUser() {
  const login = async ({ email, password }) => {
    const data = { username: 'some-user', accessToken: 'Bearer: some-token' };
    user.value.username = data.username;
    user.value.loggedIn = true;
    return { accessToken: data.accessToken, username: data.username };
  };

  const logout = async () => {
    user.value.loggedIn = false;
    user.value.username = null;
  };

  const isLoggedIn = () => !!user.value.loggedIn;

  const register = async (payload) => {
    // implementar lógica para enviar email de confirmação de cadastro
    const { data } = await http.post('/signup', { payload });
    return data;
  };

  // implementar lógica para atualização da senha
  const update = async (data) => {};

  // implementar lógica de enviar um email para o usuario resetar a senha
  const sendPasswordRestEmail = async (email) => {};

  // implementar lógica de resetar a senha
  const resetPassword = async (accessToken, newPassword) => {};

  return {
    user,
    login,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword,
  };
}
