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

export default function CreateSKUPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<SKUEntity>>({
    skuCode: "",
    description: "",
    commercialDescription: "",
    status: SKUStatusEnum.PRE_CADASTRO,
    product: undefined,
    composition: undefined,
    volumetry: undefined,
    packaging: undefined,
    userCreate: "U017599",
  });

  const { data: products, isLoading: loadingProducts } = useListProducts();
  const { data: packagings, isLoading: loadingPackagings } =
    useListPackagings();
  const { data: volumetries, isLoading: loadingVolumetries } =
    useListVolumetries();
  const { data: compositions, isLoading: loadingCompositions } =
    useListCompositions();

  const validateForm = () => {
    if (!formData.skuCode) return "Código SKU é obrigatório";
    if (!formData.description) return "Descrição é obrigatória";
    if (!formData.commercialDescription)
      return "Descrição comercial é obrigatória";
    if (!formData.product) return "Produto deve ser selecionado";
    if (!formData.composition?.formula)
      return "Origem da composição é obrigatória";
    if (!formData.composition?.keyIngredients)
      return "Pelo menos um material é obrigatório";
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setSaving(true);

      // Preparar os dados finais
      const newSKU: SKUEntity = {
        ...formData,
        createdAt: new Date(),
        updatedAt: null,
        userUpdate: null,
      } as SKUEntity;

      // Simula salvamento
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Novo SKU criado:", newSKU);

      // Redirecionar para a página de detalhes do SKU criado
      router.push(`/skus/${newSKU.skuCode}`);
    } catch (error) {
      console.error("Erro ao criar SKU:", error);
      alert("Erro ao criar SKU. Tente novamente.");
    } finally {
      setSaving(false);
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
            <SKUFormComponent formData={formData} setFormData={setFormData} />

            {/* Produto */}
            <ProductsListComponent
              products={products || []}
              loadingProducts={loadingProducts}
              formData={formData}
              setFormData={setFormData}
            />

            {/* Composição */}
            <CompositionsListComponent
              compositions={compositions || []}
              loading={loadingCompositions}
              formData={formData}
              setFormData={setFormData}
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
            />

            {/* Embalagem */}
            <PackagingsListComponent
              packagings={packagings || []}
              loading={loadingPackagings}
              formData={formData}
              setFormData={setFormData}
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
