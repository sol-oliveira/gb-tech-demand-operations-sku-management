import { api } from "@/lib/api";
import { SKURequest, SKUUpdateRequest } from "@/types/skuRequest";

export const createSKU = async (data: SKURequest) => {
  const response = await api.post("/skus", data);
  return response.data;
};

export const updateSKU = async (data: SKUUpdateRequest) => {
  console.log("Payload enviado:", data);
  console.log("ID enviado:", data.id);
  const response = await api.patch(`/skus/${data.id}`, data);
  return response.data;
};

export const getSKU = async (id: string) => {
  const response = await api.get(`/skus/${id}`);
  return response.data;
};
