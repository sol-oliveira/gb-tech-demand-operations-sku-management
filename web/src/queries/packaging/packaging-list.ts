import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PackagingValueObject } from "@/types/sku";

export function useListPackagings() {
  return useQuery<PackagingValueObject[]>({
    queryKey: ["packagings"],
    queryFn: async () => {
      const { data } = await api.get<PackagingValueObject[]>("/packagings");
      return data;
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    retry: 2, // tenta duas vezes em caso de falha
  });
}
