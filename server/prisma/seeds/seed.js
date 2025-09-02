import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Shampoo Cabelos Oleosos",
        description:
          "Shampoo para controle de oleosidade, com extrato de chá verde.",
        brand: "Boticário",
        userCreate: "U017599",
      },
      {
        name: "Condicionador Hidratante",
        description:
          "Condicionador para hidratação profunda, com óleo de argan.",
        brand: "Eudora",
        userCreate: "U017599",
      },
      {
        name: "Perfume Essencial Oud",
        description:
          "Perfume masculino com notas amadeiradas de oud e especiarias.",
        brand: "Vult",
        userCreate: "U017599",
      },
      {
        name: "Loção Corporal Floratta Red",
        description: "Loção hidratante corporal com fragrância Floral Frutal.",
        brand: "Boticário",
        userCreate: "U017599",
      },
    ],
  });

  await prisma.composition.createMany({
    data: [
      {
        compositionUniqueKey: "shampoo_cabelos_oleosos",
        formula: "Shampoo Cabelos Oleosos",
        keyIngredients:
          "Shampoo para controle de oleosidade, com extrato de chá verde.",
        userCreate: "U017599",
      },
      {
        compositionUniqueKey: "mascara_capilar_reparadora",
        formula: "Máscara Capilar Reparadora",
        keyIngredients:
          "Com queratina e aminoácidos para reparação dos fios danificados.",
        userCreate: "U017601",
      },
      {
        compositionUniqueKey: "leave_in_protetor_termico",
        formula: "Leave-in Protetor Térmico",
        keyIngredients:
          "Com proteína de trigo e filtro UV para proteção e brilho.",
        userCreate: "U017602",
      },
    ],
  });

  await prisma.volumetry.createMany({
    data: [
      {
        volumetryUniqueKey: "30ml",
        value: 30,
        unit: "ml",
        userCreate: "U017599",
      },
      {
        volumetryUniqueKey: "50g",
        value: 50,
        unit: "g",
        userCreate: "U017600",
      },
      {
        volumetryUniqueKey: "100ml",
        value: 100,
        unit: "ml",
        userCreate: "U017601",
      },
    ],
  });

  await prisma.packaging.createMany({
    data: [
      {
        packagingUniqueKey: "plastico_frasco",
        material: "Plástico",
        type: "Frasco",
        userCreate: "U017599",
      },
      {
        packagingUniqueKey: "plastico_rollon",
        material: "Plástico",
        type: "Roll-on",
        userCreate: "U017599",
      },
      {
        packagingUniqueKey: "aluminio_aerossol",
        material: "Alumínio",
        type: "Aerossol",
        userCreate: "U017599",
      },
    ],
  });
}
main()
  .then(() => {
    console.log("Seed executado com sucesso!");
  })
  .catch((e) => {
    console.error("Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
