import { SKUEntity } from '@/types/sku';

interface SKUTableProps {
  skus: SKUEntity[];
}

export function SKUTable({ skus }: SKUTableProps) {

    const skusMock = [
      {
        id: '1',    
        skuCode: 'SKU12345',
        description: 'Perfume floral feminino',
        commercialDescription: 'Perfume floral, ideal para o dia a dia',
        status: 'ATIVO',
        product: {
          id: 'prod1',
          name: 'Loção Corporal Floratta Red',
          description: 'Loção hidratante com fragrância floral.',
          brand: 'Boticário',
        },
        composition: {
          formula: 'Shampoo Cabelos Oleosos',
          unikeyIngredients: 'Shampoo para controle de oleosidade, com extrato de chá verde.',
        },
        volumetry: {
          value: 100,
          unit: 'ml',
        },
        packaging: {
          type: 'Frasco',
          material: 'Plástico',
        },
      },
    ];

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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {skusMock.map((sku) => (
            <tr key={sku.skuCode} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {sku.skuCode}
              </td>  
              <td className="px-6 py-4 text-sm text-gray-900">
                <div>
                  <div className="font-medium">{sku.product.name}</div>
                  <div className="text-gray-500 text-xs">{sku.product.description} - {sku.product.brand}</div>
                </div>
              </td> 
              <td className="px-6 py-4 text-sm text-gray-900">
                <div>
                  <div className="font-medium">{sku.description}</div>                  
                </div>
              </td>
               <td className="px-6 py-4 text-sm text-gray-900">
                <div>
                  <div className="font-medium">{sku.commercialDescription}</div>                  
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {(sku.volumetry.value)} {sku.volumetry.unit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{sku.packaging.type}</div>
                <div className="text-gray-500 text-xs">{sku.packaging.material}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="font-medium">{sku.composition.formula}</div>
                <div className="text-gray-500 text-xs">{sku.composition.unikeyIngredients}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}