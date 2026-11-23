import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Utils/api";

export const createCrudHooks = (resource) => {
  const queryKey = [resource];

  const useList = () =>
    useQuery({
      queryKey,
      queryFn: async () => (await api.get(`/${resource}`)).data,
    });

  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (payload) => (await api.post(`/${resource}`, payload)).data,
      onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, data }) =>
        (await api.put(`/${resource}/${id}`, data)).data,
      onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id) => (await api.delete(`/${resource}/${id}`)).data,
      onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    });
  };

  return { useList, useCreate, useUpdate, useDelete };
};