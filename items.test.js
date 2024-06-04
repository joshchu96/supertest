const request = require("supertest");
const app = require("./routes/app");
let shoppingList = require("./fakeDb");

let cheetos = { name: "hot cheetos", price: 6.99 };

beforeEach(function() {
    shoppingList.push(cheetos);
});

afterEach(function() {
    shoppingList.length = 0;
});

describe("GET /items", function() {
    test("Getting the shopping list of items", async() => {
        const response = await request(app).get("/items");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([cheetos]) 
    });
})

describe("POST /items", function() {
    test("Adding new item to the shopping list", async() => {
        const newItem = { name: "popsicle", price: 1.45 };
        const response = await request(app)
        .post("/items")
        .send(newItem);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ added: newItem });
      });

})

describe("PATCH /items/:name", function() {
    test("Updating a item in the shopping list", async() => {
        const response = await request(app)
            .patch(`/items/${cheetos.name}`)
            .send({name: "Flamin' Hotties" });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ updated: { name: "Flamin' Hotties", price: 6.99 } });
    })
})

describe("DELETE /items/:name", function() {
    test("Delete an item in shopping list", async() => {
        const itemName = "cheetos"
        const response  = await request(app).delete(`/items/${itemName}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Deleted"});
    })
})





