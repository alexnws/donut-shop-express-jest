import request from "supertest";
import app from "./index";

describe("Donut Shop API", () => {
  let donutId: number;

  // Test de création d'un donut
  it("adds a new donut to the inventory", async () => {
    const response = await request(app)
      .post("/donuts")
      .send({ name: "Glazed Donut", price: 2.5 });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Glazed Donut");
    expect(response.body.price).toBe(2.5);
    donutId = response.body.id;
  });

  // Test de lecture des donuts
  it("returns all donuts", async () => {
    const response = await request(app).get("/donuts");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test de mise à jour d'un donut
  it("updates a donut's details", async () => {
    const response = await request(app)
      .put(`/donuts/${donutId}`)
      .send({ name: "Chocolate Donut", price: 3.0 });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Chocolate Donut");
    expect(response.body.price).toBe(3.0);
  });

  // Test de suppression d'un donut
  it("removes a donut from the inventory", async () => {
    const createResponse = await request(app)
      .post("/donuts")
      .send({ name: "Donut to Delete", price: 2.0 });
    const donutIdToDelete = createResponse.body.id;

    // Supprime le donut
    const deleteResponse = await request(app).delete(
      `/donuts/${donutIdToDelete}`
    );
    expect(deleteResponse.status).toBe(204);
  });
});
