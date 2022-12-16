const cart = require("../model/cart");

//add item in cart
exports.createCart = async(req, res) => {
    
    const { cartItems } = req.body;
    try {   
        const newCart = new cart({
            cartItems,
        });
    
        await newCart.save();
        newCart
        ? res.status(200).json(newCart)
        : res.status(401).json({ msg: "create cart error" });
    } catch (error) {
        res.status(501).json({ msg: error.message });
    }
}