import { SKUEntity, SKUStatusEnum } from "@/types/sku";

interface KUWarningUpdateProps {
  sku: Partial<SKUEntity>;
}

export function SKUWarningUpdateComponent({ sku }: KUWarningUpdateProps) {
  // Função para verificar se um campo é editável baseado no status
  const isFieldEditable = (fieldName: string): boolean => {
    if (!sku?.status) return false;

    const editableFields: Record<string, string[]> = {
      [SKUStatusEnum.PRE_CADASTRO]: [
        "description",
        "commercialDescription",
        "skuCode",
      ],
      [SKUStatusEnum.CADASTRO_COMPLETO]: [
        "description",
        "commercialDescription",
      ],
      [SKUStatusEnum.ATIVO]: [],
      [SKUStatusEnum.DESATIVADO]: [],
      [SKUStatusEnum.CANCELADO]: [],
    };

    return editableFields[sku.status]?.includes(fieldName) || false;
  };

  // Função para verificar se os campos gerais (produto, composição, etc) são editáveis
  const areGeneralFieldsEditable = (): boolean => {
    return (
      sku?.status === SKUStatusEnum.PRE_CADASTRO ||
      sku?.status === SKUStatusEnum.CADASTRO_COMPLETO
    );
  };

  return (
    <>
      {/* Aviso sobre campos editáveis */}
      {!areGeneralFieldsEditable() &&
        !isFieldEditable("description") &&
        !isFieldEditable("commercialDescription") &&
        !isFieldEditable("skuCode") && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Campos não editáveis
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Este SKU está com status "{sku?.status}" e não permite edição
                  de campos. Apenas SKUs em "Pré-cadastro" ou "Cadastro
                  Completo" podem ter seus campos modificados.
                </p>
              </div>
            </div>
          </div>
        )}

      {(isFieldEditable("description") ||
        isFieldEditable("commercialDescription") ||
        isFieldEditable("skuCode")) &&
        !areGeneralFieldsEditable() && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Edição limitada
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  Devido ao status "{sku?.status}", apenas alguns campos básicos
                  podem ser editados:
                  {isFieldEditable("skuCode") && " Código SKU,"}
                  {isFieldEditable("description") && " Descrição Técnica,"}
                  {isFieldEditable("commercialDescription") &&
                    " Descrição Comercial."}
                </p>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
