import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface DataNotFoundUpdateProps {
  router: AppRouterInstance;
}

export function DataNotFoundUpdateComponent({
  router,
}: DataNotFoundUpdateProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          SKU não encontrado
        </h2>
        <button
          onClick={() => router.push("/skus")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Voltar para listagem
        </button>
      </div>
    </div>
  );
}
