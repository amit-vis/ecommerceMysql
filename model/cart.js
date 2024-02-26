const db = require('../config/database');

const Cart = {
    add: async (cart)=>{
        try {
            const [cartRows] = await db.query('INSERT INTO cart (product_id, quantity, updated_price) VALUES (?,1,?)',
            [cart.product_id, cart.updated_price]);
            return cartRows.insertId
        } catch (error) {
            console.log("error in adding the product into cart", error)
        }
    },
    findAllCartByProductId: async (product_id)=>{
        try {
            const [Rows] = await db.query('SELECT c.*, p.* FROM cart c JOIN products p ON c.product_id = p.id WHERE c.product_id = ?', [product_id]);
            return Rows.map((cartItem)=>({
                cart_id: cartItem.id,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                updated_price: cartItem.updated_price,
                product:{
                    id: cartItem.product_id,
                    title: cartItem.title,
                    price: cartItem.price,
                    description: cartItem.description,
                    stock: cartItem.stock,
                    category_id: cartItem.category_id,
                    category:{
                        id: cartItem.category_id,
                        category: cartItem.category
                    }
                }
            }))
        } catch (error) {
            console.log("error in finding cart item by product id", error)
        }
    },
    updateQuantity: async (product_id, updated_price) => {
        try {
            const [existingRows] = await db.query('SELECT * FROM cart WHERE product_id = ?', [product_id]);
    
            if (existingRows.length > 0) {
                // Product is already in the cart, perform an update
                const [cartRows] = await db.query('UPDATE cart SET quantity = quantity + 1, updated_price = ? WHERE product_id = ?', [updated_price, product_id]);
                console.log(cartRows.affectedRows, "affected rows");
                return cartRows.affectedRows > 0;
            } else {
                // Product is not in the cart, perform an insert
                const [cartRows] = await db.query('INSERT INTO cart (product_id, quantity, updated_price) VALUES (?, 1, ?)', [product_id, updated_price]);
                return cartRows.insertId > 0;
            }
        } catch (error) {
            console.log("Error in updating/inserting cart quantity", error);
            return false;
        }
    },
    allCartItem: async ()=>{
        try {
            const [cartRows] = await db.query('SELECT c.*, p.*, cat.category AS product_category FROM cart c JOIN products p ON c.product_id = p.id JOIN category cat ON p.category_id = cat.id');
            return cartRows.map((item)=>({
                cart_id: item.id,
                product_id: item.product_id,
                quantity: item.quantity,
                updated_price: item.updated_price,
                product:{
                    id: item.product_id,
                    title: item.title,
                    price: item.price,
                    description: item.description,
                    stock: item.stock,
                    category_id: item.category_id,
                    category:{
                        id: item.category_id,
                        category: item.product_category
                    }
                }
            }))
        } catch (error) {
            console.log("Error in getting all cart item", error)
        }
    },
    deleteCartItem: async (cart_id)=>{
        try {
            const [deleteCartRow] = await db.query('DELETE FROM cart WHERE id = ?', [cart_id]);
            return deleteCartRow
        } catch (error) {
            
        }
    },
    findCartById: async (cart_id)=>{
        try {
            const [cartRows] = await db.query('SELECT * FROM cart WHERE id = ?', [cart_id]);
            return cartRows[0]
        } catch (error) {
            
        }
    }
}

module.exports = Cart;