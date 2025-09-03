import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSKU } from "@/api/sku/createSKU";
import { SKURequest } from "@/types/skuRequest";

export const useCreateSKU = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SKURequest) => createSKU(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skus"] });
    },
  });
};
