import { api as http } from '../boot/axios';

export default function useApi() {
  const list = async ({ path }) => http.get(path);
  const create = async ({ path, payload }) => http.post(path, payload);
  const getById = async ({ path, id }) => http.get(`${path}?${id}`);
  const update = async ({ path, payload }) => http.patch(path, payload);
  const remove = async ({ path, payload }) => http.delete(path, { data: payload });

  return {
    list,
    create,
    getById,
    update,
    remove,
  };
}
