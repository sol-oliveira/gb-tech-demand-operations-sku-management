"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { SKUEntity, SKUStatusEnum } from "@/types/sku";
import { SKUFormComponent } from "@/components/skus/SKUFormComponent";
import { ProductsListComponent } from "@/components/products/ProsuctsListComponent";
import { CompositionsListComponent } from "@/components/compositions/CompositionsListComponent";
import { useListProducts } from "@/queries/products/product-list";
import { useListPackagings } from "@/queries/packaging/packaging-list";
import { useListVolumetries } from "@/queries/volumetry/volumetry-list";
import { useListCompositions } from "@/queries/composition/composition-list";
import { VolumetriesListComponent } from "@/components/volumetries/VolumetriesListComponent";
import { PackagingsListComponent } from "@/components/packagings/PackaginsListComponente";
import { SKUHeaderUpdateComponent } from "@/components/skus/edit/SKUHeaderUpdateComponent";
import { DataNotFoundUpdateComponent } from "@/components/skus/edit/DataNotFoundUpdateComponent";
import { SKUWarningUpdateComponent } from "@/components/skus/edit/SKUWarningUpdateComponent";
import { useGetSKUById } from "@/queries/skus/sku-get-by-id";
import { LoadingSpinnerComponent } from "@/components/shared/LoadingSpinnerComponent";
import { SKURequest, SKUUpdateRequest } from "@/types/skuRequest";
import { createSKU } from "@/api/sku/apiSKU";

export default function EditSKUPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<SKUEntity>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalSKU, setOriginalSKU] = useState<SKUEntity | null>(null);

  const { data: sku, isLoading: loadingSKU } = useGetSKUById(String(params.id));
  const { data: products, isLoading: loadingProducts } = useListProducts();
  const { data: packagings, isLoading: loadingPackagings } =
    useListPackagings();
  const { data: volumetries, isLoading: loadingVolumetries } =
    useListVolumetries();
  const { data: compositions, isLoading: loadingCompositions } =
    useListCompositions();

  const loadOriginalSKU = useCallback(async () => {
    if (!sku) return;

    try {
      setOriginalSKU(sku);

      const clonedData: Partial<SKUEntity> = {
        ...sku,
        skuCode: generateNewSKUCode(sku.skuCode),
        status: SKUStatusEnum.PRE_CADASTRO,
        userCreate: "U017599",
      };

      setFormData(clonedData);
    } catch (error) {
      console.error("Erro ao carregar SKU original:", error);
    } finally {
      setLoading(false);
    }
  }, [sku]);

  useEffect(() => {
    loadOriginalSKU();
  }, [loadOriginalSKU]);

  const generateNewSKUCode = (originalCode: string): string => {
    // Gera um novo código adicionando -V2 ao código original
    return `${originalCode}-V2`;
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setIsSubmitted(true);

      const payload = {
        id: formData.id,
        skuCode: formData.skuCode,
        description: formData.description,
        commercialDescription: formData.commercialDescription,
        status: formData.status,
        productId: formData.product?.id,
        compositionId: formData.composition?.compositionUniqueKey,
        volumetryId: formData.volumetry?.volumetryUniqueKey,
        packagingId: formData.packaging?.packagingUniqueKey,
        userCreate: "U017599",
      } as SKURequest;

      await createSKU(payload);
      router.push(`/skus`);
    } catch (error) {
      console.error("Erro ao salvar SKU:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadOriginalSKU();
  }, [loadOriginalSKU]);

  return (
    <div className="min-h-screen bg-gray-50">
      {loadingSKU && <LoadingSpinnerComponent />}
      {!loadingSKU && !sku && <DataNotFoundUpdateComponent router={router} />}
      {!loadingSKU && sku && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <SKUHeaderUpdateComponent
            sku={formData}
            saving={saving}
            handleUpdate={handleUpdate}
            router={router}
          />

          <SKUWarningUpdateComponent sku={sku || {}} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* SKU */}
              <SKUFormComponent
                formData={formData}
                setFormData={setFormData}
                isSubmitted={isSubmitted}
              />

              {/* Produto */}
              <ProductsListComponent
                products={products || []}
                loadingProducts={loadingProducts}
                formData={formData}
                setFormData={setFormData}
                isSubmitted={isSubmitted}
              />

              {/* Composição */}
              <CompositionsListComponent
                compositions={compositions || []}
                loading={loadingCompositions}
                formData={formData}
                setFormData={setFormData}
                isSubmitted={isSubmitted}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Volumetria */}
              <VolumetriesListComponent
                volumetries={volumetries || []}
                loading={loadingVolumetries}
                formData={formData}
                setFormData={setFormData}
                isSubmitted={isSubmitted}
              />

              {/* Embalagem */}
              <PackagingsListComponent
                packagings={packagings || []}
                loading={loadingPackagings}
                formData={formData}
                setFormData={setFormData}
                isSubmitted={isSubmitted}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
