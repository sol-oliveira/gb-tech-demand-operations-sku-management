import { CompositionValueObject, SKUEntity } from "@/types/sku";

interface CompositionsListProps {
  compositions: CompositionValueObject[];
  loading: boolean;
  formData: Partial<SKUEntity>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<SKUEntity>>>;
  isSubmitted: boolean;
}

export function CompositionsListComponent({
  compositions,
  loading,
  formData,
  setFormData,
  isSubmitted,
}: CompositionsListProps) {
  const handleCompositionChange = (compositionId: string) => {
    const selectedComposition = compositions?.find(
      (c) => c.compositionUniqueKey === compositionId
    );
    if (selectedComposition) {
      setFormData((prev) => ({
        ...prev,
        composition: selectedComposition,
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Composição</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecionar Composição *
          </label>
          {loading ? (
            <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
              Carregando composição...
            </div>
          ) : (
            <select
              value={formData.composition?.compositionUniqueKey || ""}
              onChange={(e) => handleCompositionChange(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 ${
                isSubmitted && !formData.composition?.compositionUniqueKey
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Selecione uma composição</option>
              {compositions?.map((composition) => (
                <option
                  key={composition.compositionUniqueKey}
                  value={composition.compositionUniqueKey}
                >
                  {composition.formula} - {composition.keyIngredients}
                </option>
              ))}
            </select>
          )}
        </div>

        {formData.composition && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fórmula
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.composition.formula}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredientes
              </label>
              <div className="text-sm text-gray-900 font-medium">
                {formData.composition.keyIngredients}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
