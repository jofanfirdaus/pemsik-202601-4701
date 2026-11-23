import { createCrudHooks } from "./useCrud";

const { useList, useCreate, useUpdate, useDelete } = createCrudHooks("dosen");

export const useDosen = useList;
export const useCreateDosen = useCreate;
export const useUpdateDosen = useUpdate;
export const useDeleteDosen = useDelete;