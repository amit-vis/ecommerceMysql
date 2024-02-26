const db = require('../config/database');

const Order = {
    placeOrder: async (order)=>{
        try {
            const [orderRows] = await db.query('INSERT INTO place_order (status, cart_id) VALUES (?,?)', 
            [order.status, order.cart_id]);
            return orderRows.insertId
        } catch (error) {
            console.log("Error in insertin the cart items")
        }
    },
    findOrderByCartId: async (cart_id) => {
        try {
            const [orderRows] = await db.query('SELECT * FROM place_order WHERE cart_id = ?', [cart_id]);
            console.log("here is the order", orderRows)
            return orderRows;
        } catch (error) {
            console.log("Error in finding order by cart_id", error);
            throw error;
        }
    },
    orderHistory: async () => {
        try {
            const [orderHistory] = await db.query(`
                SELECT 
                    o.*,
                    c.id AS cart_id,
                    c.quantity AS cart_quantity,
                    c.updated_price AS cart_updated_price,
                    p.id AS product_id,
                    p.title AS product_title,
                    p.price AS product_price,
                    p.description AS product_description,
                    p.stock AS product_stock,
                    cat.id AS category_id,
                    cat.category AS category_name
                FROM place_order o
                JOIN cart c ON o.cart_id = c.id
                JOIN products p ON c.product_id = p.id
                JOIN category cat ON p.category_id = cat.id
                ORDER BY o.time DESC
            `);
    
            return orderHistory;
        } catch (error) {
            console.error("Error fetching order history:", error);
            throw error;
        }
    },
    orderDetails: async (order_id)=>{
        try {
            const [orderRows] = await db.query(`SELECT 
            o.*,
            c.id AS cart_id,
            c.quantity AS cart_quantity,
            c.updated_price AS cart_updated_price,
            p.id AS product_id,
            p.title AS product_title,
            p.price AS product_price,
            p.description AS product_description,
            p.stock AS product_stock,
            cat.id AS category_id,
            cat.category AS category_name
        FROM place_order o
        JOIN cart c ON o.cart_id = c.id
        JOIN products p ON c.product_id = p.id
        JOIN category cat ON p.category_id = cat.id
        WHERE o.id = ?
        ORDER BY o.time DESC;
        `, [order_id]);
        return orderRows[0]
        } catch (error) {
            console.error("Error fetching order details by id:", error);
            throw error;
        }
    }
}

module.exports = Order;