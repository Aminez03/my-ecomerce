const express = require("express");

const { addProduct, getAllProduct, getMenProducts, getWomenProducts, getOneProduct, deleteProduct, updateProduct } = require("../controllers/product.controller");

router = express.Router();

//router
router.post("/addProduct", addProduct);

router.get("/getAllProduct", getAllProduct);

router.get("/getMenProducts", getMenProducts);
router.get("/getWomenProducts", getWomenProducts);

router.get("/getOneProduct/:_id", getOneProduct);

router.delete("/deleteOneProduct/:_id", deleteProduct);

router.put("/updateProduct/:_id", updateProduct);

module.exports = router;