import { createCrudHooks } from "./useCrud";

const { useList, useCreate, useUpdate, useDelete } = createCrudHooks("kelas");

export const useKelas = useList;
export const useCreateKelas = useCreate;
export const useUpdateKelas = useUpdate;
export const useDeleteKelas = useDelete;