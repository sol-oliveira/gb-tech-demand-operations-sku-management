import { PackagingValueObject, SKUEntity } from "@/types/sku";

interface PackagingsListProps {
  packagings: PackagingValueObject[];
  loading: boolean;
  formData: Partial<SKUEntity>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SKUEntity>>>;
}

export function PackagingsListComponent({
  packagings,
  loading,
  formData,
  setFormData,
}: PackagingsListProps) {
  const handlePackagingChange = (packagingId: string) => {
    const selectedPackaging = packagings?.find(
      (p) => p.packagingUniqueKey === packagingId
    );
    if (selectedPackaging) {
      setFormData((prev) => ({
        ...prev,
        packaging: selectedPackaging,
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Embalagem</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecionar Embalagem *
          </label>
          {loading ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
              Carregando embalagem...
            </div>
          ) : (
            <select
              value={formData.packaging?.packagingUniqueKey || ""}
              onChange={(e) => handlePackagingChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            >
              <option value="">Selecione uma embalagem</option>
              {packagings?.map((packaging) => (
                <option
                  key={packaging.packagingUniqueKey}
                  value={packaging.packagingUniqueKey}
                >
                  {packaging.material} - {packaging.type}
                </option>
              ))}
            </select>
          )}
        </div>

        {formData.packaging && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.packaging.material}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.packaging.type}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
