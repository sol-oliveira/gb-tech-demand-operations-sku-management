import { SKUEntity } from "@/types/sku";
import Link from "next/link";

interface SKUTableProps {
  skus: SKUEntity[];
}

export function SKUTableComponent({ skus }: SKUTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-lg border">
      <table className="min-w-full divide-y divide-gray-200">
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
              Descrição Comercial
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {sku.skuCode}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                <div>
                  <div className="font-medium">{sku.product.name}</div>
                  <div className="text-gray-500 text-xs">
                    {sku.product.description} - {sku.product.brand}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {sku.description}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {sku.commercialDescription}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {sku.volumetry.value} {sku.volumetry.unit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{sku.packaging.type}</div>
                <div className="text-gray-500 text-xs">
                  {sku.packaging.material}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{sku.composition.formula}</div>
                <div className="text-gray-500 text-xs">
                  {sku.composition.keyIngredients}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  title="Visualizar SKU"
                  href={`/skus/${sku.skuCode}`}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  🔎
                </Link>
                <Link
                  title="Editar SKU"
                  href={`/skus/${sku.skuCode}/edit`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  📝
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
