import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CompositionValueObject } from "@/types/sku";

export function useListCompositions() {
  return useQuery<CompositionValueObject[]>({
    queryKey: ["compositions"],
    queryFn: async () => {
      const { data } = await api.get<CompositionValueObject[]>("/compositions");
      return data;
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    retry: 2, // tenta duas vezes em caso de falha
  });
}
