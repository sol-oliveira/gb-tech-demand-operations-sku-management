import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSKU } from "@/api/sku/apiSKU";
import { SKUUpdateRequest } from "@/types/skuRequest";

export const useUpdateSKU = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SKUUpdateRequest) => updateSKU(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skus-update"] });
    },
  });
};
