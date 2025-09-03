import { api } from "@/lib/api";
import { SKURequest } from "@/types/skuRequest";

export const createSKU = async (data: SKURequest) => {
  const response = await api.post("/skus", data);
  return response.data;
};
