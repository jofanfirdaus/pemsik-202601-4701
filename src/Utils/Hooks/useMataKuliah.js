import { createCrudHooks } from "./useCrud";

const { useList, useCreate, useUpdate, useDelete } = createCrudHooks("matakuliah");

export const useMataKuliah = useList;
export const useCreateMataKuliah = useCreate;
export const useUpdateMataKuliah = useUpdate;
export const useDeleteMataKuliah = useDelete;