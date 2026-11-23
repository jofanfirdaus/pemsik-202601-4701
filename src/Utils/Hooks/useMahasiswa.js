import { useQuery } from "@tanstack/react-query";
import api from "@/Utils/api";
import { createCrudHooks } from "./useCrud";

const { useList, useCreate, useUpdate, useDelete } = createCrudHooks("mahasiswa");

export const useMahasiswa = useList;
export const useCreateMahasiswa = useCreate;
export const useUpdateMahasiswa = useUpdate;
export const useDeleteMahasiswa = useDelete;

export const useMahasiswaDetail = (nim) =>
  useQuery({
    queryKey: ["mahasiswa", "detail", nim],
    queryFn: async () => {
      const res = await api.get("/mahasiswa", { params: { nim } });
      return res.data[0] ?? null;
    },
    enabled: !!nim,
  });