import { SKUEntity, SKUStatusEnum } from "@/types/sku";
import Link from "next/link";
import { StatusBadgeComponent } from "../shared/StatusBadgeComponent";

interface SKUTableProps {
  skus: SKUEntity[];
}

export function SKUTableComponent({ skus }: SKUTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dimensões
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Embalagem
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Composição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {skus.map((sku) => (
            <tr key={sku.id} className="hover:bg-gray-50">
              <td className="px-1 py-4 whitespace-nowrap max-w-[50px] gap-1 text-sm font-medium text-gray-900">
                {sku.skuCode}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 gap-1">
                <div>
                  <div className="font-medium">{sku.product.name}</div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{sku.description}</div>
                <div className="text-gray-500 text-xs whitespace-normal">
                  {sku.commercialDescription}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <StatusBadgeComponent status={sku.status as SKUStatusEnum} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap max-w-[50px] text-sm text-gray-900">
                {sku.volumetry.value} {sku.volumetry.unit}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{sku.packaging.type}</div>
                <div className="text-gray-500 text-xs">
                  {sku.packaging.material}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{sku.composition.formula}</div>
                <div className="text-gray-500 text-xs whitespace-normal">
                  {sku.composition.keyIngredients}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                <Link
                  href={`/skus/${sku.id}/clone`}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
                >
                  Clonar
                </Link>
                <Link
                  href={`/skus/${sku.id}/edit`}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
