import { StatusBadgeComponent } from "@/components/shared/StatusBadgeComponent";
import { SKUEntity, SKUStatusEnum } from "@/types/sku";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface SKUHeaderUpdateComponentProps {
  handleUpdate: () => void;
  saving: boolean;
  router: AppRouterInstance;
  sku: Partial<SKUEntity>;
}

export function SKUHeaderUpdateComponent({
  handleUpdate,
  saving,
  router,
  sku,
}: SKUHeaderUpdateComponentProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Editar SKU: {sku?.skuCode}
            </h1>
            <p className="text-gray-600 mt-1">Edite as informações do SKU</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <StatusBadgeComponent status={sku.status as SKUStatusEnum} />
          <div className="flex space-x-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
