const supertest = require("supertest")
const assert = require("assert")
const { server } = require("../index")
jest.useFakeTimers()
describe("products test", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    test("get products", () => {
        supertest(server)
            .get("/api/v1/item/products")
            .expect(400)
            .end((err, result) => {
                if (err) {
                    throw err
                }
            })
    })
})