import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { SKUEntity } from "@/types/sku";

export function useSKUs() {
  return useQuery<SKUEntity[]>({
    queryKey: ["skus"],
    queryFn: async () => {
      const { data } = await api.get<SKUEntity[]>("/skus");
      return data;
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    retry: 2, // tenta duas vezes em caso de falha
  });
}
