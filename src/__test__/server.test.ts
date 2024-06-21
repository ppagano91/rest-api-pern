import requests from "supertest"
import server from "../server"
// Ejemplo
describe("Test", () => {
    it("Revisar 1+1 = 2", () => {
        expect(1+1).toBe(2)
    })

    it("Revisar 1+1 != 3", () => {
        expect(1+1).not.toBe(3)
    })
})

describe("GET /api", () => {
    it("Should send back a json response", async () => {
        const res = await requests(server).get("/api");

        expect(res.status).toBe(200);
        expect(res.headers["content-type"]).toMatch(/json/);
        expect(res.body.msg).toBe("GET /api");

        expect(res.status).not.toBe(404);
        expect(res.body.msg).not.toBe("POST /api");
    })
})