const Cart = require('../model/cart');
const Product = require('../model/product');

module.exports.addCart = async (req, res) => {
    try {
        const product = await Product.findProductDetailsById(req.params.id);
        const cart = await Cart.findAllCartByProductId(product.id);

        if (product.stock === 0) {
            return res.status(400).json({
                message: "product is not in stock or not available",

            });
        }

        // Check if the cart array has any elements
        if (cart.length > 0) {
            const changeQuantity = await Cart.updateQuantity(product.id, product.price);

            if (!changeQuantity) {
                return res.status(400).json({
                    message: "Product not found in the cart or error in updating quantity",
                    success: false,
                });
            }
        } else {
            const addintoCart = await Cart.add({
                product_id: product.id,
                updated_price: product.price,
            });

            if (!addintoCart) {
                return res.status(400).json({
                    message: "Error in adding product into cart",
                    success: false,
                });
            }
        }

        return res.status(200).json({
            message: cart.length > 0 ? "Cart Item updated" : "New Item added into the cart",
            success: true,
            cart: {
                product_id: product.id,
                quantity: cart.length > 0 ? cart[0].quantity + 1 : 1,
                updated_price: product.price * (cart.length > 0 ? cart[0].quantity + 1 : 1),
            },
        });
    } catch (error) {
        console.log("Error in adding the product to the cart", error);
        return res.status(500).json({
            message: "Error in adding the product to the cart",
            error,
        });
    }
};

module.exports.allItemCart = async (req, res)=>{
    try {
        const cartItemList = await Cart.allCartItem({});
        if(cartItemList){
            return res.status(200).json({
                message: "List of all the cart item",
                success: true,
                cartItemList
            })
        }else{
            return res.status(400).json({
                message: "Cart Item not fount or not exist",
                success: false
            })
        }
    } catch (error) {
        console.log("Internal server error in getting cart item list", error);
        return res.status(500).json({
            message: "Internal server error in getting cart item list",
            error
        })
    }
}


module.exports.removeItem = async (req, res)=>{
    try {
        const deleteItem = await Cart.deleteCartItem(req.params.id);
        return res.status(200).json({
            message: "Item deleted successfully!",
            success: true,
            deleteItem
        })
    } catch (error) {
        
    }
}