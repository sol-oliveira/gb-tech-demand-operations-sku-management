"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SKUEntity, SKUStatusEnum } from "@/types/sku";
import { useListPackagings } from "@/queries/packaging/packaging-list";
import { useListVolumetries } from "@/queries/volumetry/volumetry-list";
import { useListCompositions } from "@/queries/composition/composition-list";
import { useListProducts } from "@/queries/products/product-list";
import { ProductsListComponent } from "@/components/products/ProsuctsListComponent";
import { PackagingsListComponent } from "@/components/packagings/PackaginsListComponente";
import { VolumetriesListComponent } from "@/components/volumetries/VolumetriesListComponent";
import { CompositionsListComponent } from "@/components/compositions/CompositionsListComponent";
import { SKUHeaderCreateComponent } from "@/components/skus/SKUHeaderCreateComponent";
import { SKUFormComponent } from "@/components/skus/SKUFormComponent";
import { useCreateSKU } from "@/hooks/sku/useCreateSKU";
import { SKURequest } from "@/types/skuRequest";

function validateRequiredFields(
  obj: Partial<SKUEntity>,
  fields: (keyof SKUEntity)[]
) {
  for (const field of fields) {
    const value = obj[field];
    if (value === "" || value === null || value === undefined) {
      return `${field} é obrigatório`;
    }
  }
  return null; // tudo ok
}

export default function CreateSKUPage() {
  const [saving, setSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<SKUEntity>>({
    skuCode: "",
    description: "",
    commercialDescription: "",
    status: "",
    product: undefined,
    composition: undefined,
    volumetry: undefined,
    packaging: undefined,
    userCreate: "",
    userUpdate: "",
  });

  const { mutateAsync: createSKU, isPending } = useCreateSKU();

  const router = useRouter();

  const { data: products, isLoading: loadingProducts } = useListProducts();
  const { data: packagings, isLoading: loadingPackagings } =
    useListPackagings();
  const { data: volumetries, isLoading: loadingVolumetries } =
    useListVolumetries();
  const { data: compositions, isLoading: loadingCompositions } =
    useListCompositions();

  const handleSave = async () => {
    try {
      setIsSubmitted(true);
      setSaving(true);

      const error = validateRequiredFields(formData, [
        "skuCode",
        "description",
        "commercialDescription",
        "product",
        "composition",
        "volumetry",
        "packaging",
      ]);

      if (error) return;

      const payload = {
        skuCode: formData.skuCode,
        description: formData.description,
        commercialDescription: formData.commercialDescription,
        status: SKUStatusEnum.PRE_CADASTRO,
        productId: formData.product?.id,
        compositionId: formData.composition?.compositionUniqueKey,
        volumetryId: formData.volumetry?.volumetryUniqueKey,
        packagingId: formData.packaging?.packagingUniqueKey,
        userCreate: "U017599",
      } as SKURequest;

      await createSKU(payload);

      router.push(`/skus`);
    } catch (error) {
      console.error("Erro ao criar SKU:", error);
      alert("Erro ao criar SKU. Tente novamente.");
      setSaving(false);
    } finally {
      setSaving(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <SKUHeaderCreateComponent
          handleSave={handleSave}
          saving={saving}
          router={router}
        />

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
            {/* Informações Adicionais */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                💡 Dicas
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Preencha todos os campos obrigatórios (*)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
