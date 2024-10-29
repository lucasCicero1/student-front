export default function useAuthUser() {
  const login = async () => ({ accessToken: 'Bearer: some-token', username: 'Lucas Silva' });
  const logout = async () => {};
  const register = async () => {};
  return {
    login,
    logout,
    register,
  };
}
