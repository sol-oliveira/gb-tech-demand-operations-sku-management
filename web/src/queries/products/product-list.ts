import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ProductEntity } from "@/types/sku";

export function useListProducts() {
  return useQuery<ProductEntity[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get<ProductEntity[]>("/products");
      return data;
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    retry: 2, // tenta duas vezes em caso de falha
  });
}
