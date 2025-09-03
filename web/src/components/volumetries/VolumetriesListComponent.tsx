import { SKUEntity, VolumetryValueObject } from "@/types/sku";

interface VolumetriesListProps {
  volumetries: VolumetryValueObject[];
  loading: boolean;
  formData: Partial<SKUEntity>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SKUEntity>>>;
  isSubmitted: boolean;
}

export function VolumetriesListComponent({
  volumetries,
  loading,
  formData,
  setFormData,
  isSubmitted,
}: VolumetriesListProps) {
  const handleVolumetryChange = (volumetryId: string) => {
    const selectedVolumetry = volumetries?.find(
      (v) => v.volumetryUniqueKey === volumetryId
    );
    if (selectedVolumetry) {
      setFormData((prev) => ({
        ...prev,
        volumetry: selectedVolumetry,
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Volumetria</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecionar Volumetria *
          </label>
          {loading ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
              Carregando volumetria...
            </div>
          ) : (
            <select
              value={formData.volumetry?.volumetryUniqueKey || ""}
              onChange={(e) => handleVolumetryChange(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                isSubmitted && !formData.volumetry?.volumetryUniqueKey
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Selecione uma volumetria</option>
              {volumetries?.map((volumetry) => (
                <option
                  key={volumetry.volumetryUniqueKey}
                  value={volumetry.volumetryUniqueKey}
                >
                  {volumetry.value} - {volumetry.unit}
                </option>
              ))}
            </select>
          )}
        </div>

        {formData.volumetry && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unidade
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.volumetry.value}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.volumetry.unit}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
