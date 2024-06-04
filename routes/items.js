const express = require("express");
const items = require("../fakeDb");
const router = new express.Router();

//this route display all the items
router.get("/", (req,res) => {
    res.json(items);
});

//this route addes a new item to shopping list and returns added item
router.post("/", (req,res) => {
    const newItem = req.body;
    items.push(newItem);
    res.json({ added: newItem });
});

//this route searches for specific item in shoppping list and returns the info
router.get("/:name", (req,res) => {
    let item = items.find(item => item.name === req.params.name);
    res.json(item);    
})

//modify a single items name and/or price
router.patch("/:name", (req,res) => {
    const itemName = req.params.name;
    const {name, price} = req.body;

    const item = items.find(item => item.name === itemName);
    item.name = name;
    item.price = price;

    res.json({ updated: {name: item.name, price: item.price}});
});

//delete an item in the shopping list
router.delete("/:name", (req,res) => {
    const itemName = req.params.name;
    const itemIndex = items.findIndex(item => item.name === itemName);
    const deletedItem = items.splice(itemIndex,1);

    res.json({message: "Deleted"});
});


module.exports = router;