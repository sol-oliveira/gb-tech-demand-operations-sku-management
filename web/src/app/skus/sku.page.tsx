import { api } from '@/lib/api';
import { SKUEntity } from '@/types/sku';
import { SKUTable } from '@/components/SKUTable';

export default async function SKUsPage() {
  const response = await api.get<SKUEntity[]>('/skus');
  const skus = response.data;
  console.log(skus);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de SKUs</h1>
      <SKUTable skus={skus} />
    </div>
  );
}
