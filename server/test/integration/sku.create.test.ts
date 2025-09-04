import request from "supertest";
import { app } from "../../src/presentation/server";

describe("SKU Integration - POST /skus", () => {
  it("deve criar um novo SKU com sucesso", async () => {
    const payload = {
      productId: "id-do-produto-existente",
      compositionId: "id-da-composicao-existente",
      volumetryId: "id-da-volumetria-existente",
      packagingId: "id-da-embalagem-existente",
      description: "Descrição do SKU",
      commercialDescription: "Descrição comercial",
      userCreate: "usuario-teste",
    };

    const response = await request(app.server)
      .post("/skus")
      .send(payload)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("skuCode");
    expect(response.body.data.status).toBe("PRE_CADASTRO");
  });
});
