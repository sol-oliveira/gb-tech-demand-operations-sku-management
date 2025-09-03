import { SKUStatusEnum } from "@/types/sku";

interface StatusBadgeProps {
  status: SKUStatusEnum;
}

const statusConfig = {
  [SKUStatusEnum.PRE_CADASTRO]: {
    label: "Pré-cadastro",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  [SKUStatusEnum.CADASTRO_COMPLETO]: {
    label: "Cadastro Completo",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  [SKUStatusEnum.ATIVO]: {
    label: "Ativo",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  [SKUStatusEnum.DESATIVADO]: {
    label: "Desativado",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  [SKUStatusEnum.CANCELADO]: {
    label: "Cancelado",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

export function StatusBadgeComponent({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border ${config?.className}`}
    >
      {config?.label}
    </span>
  );
}
