import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { VolumetryValueObject } from "@/types/sku";

export function useListVolumetries() {
  return useQuery<VolumetryValueObject[]>({
    queryKey: ["volumetries"],
    queryFn: async () => {
      const { data } = await api.get<VolumetryValueObject[]>("/volumetries");
      return data;
    },
    staleTime: 1000 * 60 * 5, // cache por 5 minutos
    retry: 2, // tenta duas vezes em caso de falha
  });
}
