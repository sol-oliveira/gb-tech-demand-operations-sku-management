import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { SKUEntity } from "@/types/sku";

export function useGetSKUById(id: string) {
  return useQuery<SKUEntity>({
    queryKey: ["sku", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<SKUEntity>(`/skus/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    retry: 2, // tenta duas vezes em caso de falha
  });
}
