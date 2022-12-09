const express = require("express");
const { createCart } = require("../controllers/cart.controller");


router = express.Router();

router.post("/addItem", createCart);



module.exports = router;