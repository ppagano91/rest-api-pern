import request from "supertest"
import server from "../../server"

describe("POST /api/products", () => {
    it("Should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("error");
        expect(response.body.errors).not.toHaveLength(2);

    })

    it("Should validate if the price is greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Monitor - Testing",
            price: 0
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("error");
        expect(response.body.errors).not.toHaveLength(2);

    })

    it("Should validate if the price is a number greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Monitor - Testing",
            price: "test"
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("error");
        expect(response.body.errors).not.toHaveLength(2);

    })

    it("Should create a new product", async () => {
        const response = await request(server).post("/api/products").send({name: "Mouse - Testing", price:100});
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(200);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("error");
    })
})