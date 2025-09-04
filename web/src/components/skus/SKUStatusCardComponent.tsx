import { SKUEntity, SKUStatusEnum } from "@/types/sku";

interface SKUTableProps {
  skus: SKUEntity[];
}

export function SKUStatusCardComponent({ skus }: SKUTableProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-gray-900">{skus?.length}</div>
        <div className="text-gray-600">Total de SKUs</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-green-600">
          {
            skus?.filter((sku: SKUEntity) => sku.status === SKUStatusEnum.ATIVO)
              .length
          }
        </div>
        <div className="text-gray-600">Ativos</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-blue-600">
          {
            skus?.filter(
              (sku: SKUEntity) => sku.status === SKUStatusEnum.CADASTRO_COMPLETO
            ).length
          }
        </div>
        <div className="text-gray-600">Cadastro Completo</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-orange-600">
          {
            skus?.filter(
              (sku: SKUEntity) => sku.status === SKUStatusEnum.PRE_CADASTRO
            ).length
          }
        </div>
        <div className="text-gray-600">Pré-cadastro</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-red-600">
          {
            skus?.filter(
              (sku: SKUEntity) => sku.status === SKUStatusEnum.DESATIVADO
            ).length
          }
        </div>
        <div className="text-gray-600">Desativados</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-red-600">
          {
            skus?.filter(
              (sku: SKUEntity) => sku.status === SKUStatusEnum.CANCELADO
            ).length
          }
        </div>
        <div className="text-gray-600">Cancelados</div>
      </div>
    </div>
  );
}
