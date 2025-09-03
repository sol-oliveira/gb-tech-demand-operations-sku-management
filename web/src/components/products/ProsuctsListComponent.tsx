import { ProductEntity, SKUEntity } from "@/types/sku";

interface ProductsListProps {
  products: ProductEntity[];
  loadingProducts: boolean;
  formData: Partial<SKUEntity>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SKUEntity>>>;
  isSubmitted: boolean;
}

export function ProductsListComponent({
  products,
  loadingProducts,
  formData,
  setFormData,
  isSubmitted,
}: ProductsListProps) {
  const handleProductChange = (productId: string) => {
    const selectedProduct = products?.find((p) => p.id === productId);
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product: selectedProduct,
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Produto</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecionar Produto *
          </label>
          {loadingProducts ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
              Carregando produtos...
            </div>
          ) : (
            <select
              value={formData.product?.id || ""}
              onChange={(e) => handleProductChange(e.target.value)}
              required
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                isSubmitted && !formData.product?.id
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Selecione um produto</option>
              {products?.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.brand} - {product.name} ({product.description})
                </option>
              ))}
            </select>
          )}
        </div>

        {formData.product && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Produto
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.product.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.product.brand}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.product.description}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
