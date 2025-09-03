import { SKUEntity, SKUStatusEnum } from "@/types/sku";

interface SKUFormComponentProps {
  formData: Partial<SKUEntity>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SKUEntity>>>;
  isSubmitted: boolean;
}

export function SKUFormComponent({
  formData,
  setFormData,
  isSubmitted,
}: SKUFormComponentProps) {
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSKUCode = () => {
    // Gera um código SKU baseado no produto e categoria
    const category =
      formData.product?.name?.substring(0, 3).toUpperCase() || "PRD";
    const timestamp = Date.now().toString().slice(-6);
    const newSKUCode = `${category}-${timestamp}`;
    handleInputChange("skuCode", newSKUCode);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Informações Básicas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código SKU *
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.skuCode || ""}
              onChange={(e) => handleInputChange("skuCode", e.target.value)}
              placeholder="Ex: CAB-123456"
              required
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                isSubmitted && !formData.skuCode
                  ? "border-red-500 text-red-600"
                  : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={generateSKUCode}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
            >
              Gerar
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={SKUStatusEnum.PRE_CADASTRO}
            required
            disabled
            onChange={(e) => handleInputChange("status", e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
              isSubmitted && !formData.skuCode
                ? "border-red-500 text-red-600"
                : "border-gray-300"
            }`}
          >
            <option value={SKUStatusEnum.PRE_CADASTRO}>Pré cadastro</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição Técnica *
          </label>
          <input
            type="text"
            value={formData.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Ex: Shampoo Cabelos Oleosos 300ml"
            required
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
              isSubmitted && !formData.skuCode
                ? "border-red-500 text-red-600"
                : "border-gray-300"
            }`}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição Comercial *
          </label>
          <textarea
            value={formData.commercialDescription || ""}
            onChange={(e) =>
              handleInputChange("commercialDescription", e.target.value)
            }
            required
            rows={3}
            placeholder="Descrição que será exibida para o cliente final"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
              isSubmitted && !formData.skuCode
                ? "border-red-500 text-red-600"
                : "border-gray-300"
            } `}
          />
        </div>
      </div>
    </div>
  );
}
