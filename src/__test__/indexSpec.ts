import supertest from "supertest";
import app from "../index"

const req = supertest(app);

describe("Test basic endpoint server", () => {
    it("Get the / endpoint", async () => {
        const res = await req.get("/");
        expect(res.status).toBe(200);
    })
})