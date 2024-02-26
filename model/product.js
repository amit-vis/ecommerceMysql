const db = require('../config/database');

const Products = {
    create: async (product) => {
        try {
            const [result] = await db.query('INSERT INTO products (title, price, description, stock, category_id) VALUES(?,?,?,?,?)',
                [product.title, product.price, product.description, product.stock, product.category_id]);
            return result.insertId
        } catch (error) {
            console.log("Error in creating the product", error)
        }
    },
    findByTitle: async (product) => {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE LOWER(title) = LOWER(?)', [product.title.trim()]);
            return rows.length > 0 ? rows : null
        } catch (error) {
            console.log('Error in finding product title', error);
        }
    },
    findAllProduct: async () => {
        try {
            const [rows] = await db.query('SELECT p.*, c.category FROM products p JOIN category c ON p.category_id = c.id',);
            return rows
        } catch (error) {
            console.log("Error in getting all products", error)
        }
    },
    findAllBycategoryId: async (category_id) => {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE category_id = ?', [category_id]);
            return rows
        } catch (error) {
            console.log("Error in getting products by category id", error)
        }
    },
    getProductsWithCategory: async () => {
        try {
            const [rows] = await db.query('SELECT p.*, c.category FROM products p JOIN category c ON p.category_id = c.id');

            return rows;
        } catch (error) {
            console.error('Error fetching products with category:', error);
            throw error; // Handle the error appropriately in your application
        }
    },
    updateStock: async (productId) => {
        try {
            const [productRows] = await db.query('SELECT p.*, c.category FROM products p JOIN category c ON p.category_id = c.id WHERE p.id = ?', [productId]);

            if (productRows.length === 0) {
                return null;
            }

            const currentStock = productRows[0].stock;
            const changeStock = currentStock === 1 ? 0 : 1;

            const [result] = await db.query('UPDATE products SET stock = ? WHERE id = ?', [changeStock, productId]);

            if (result.affectedRows > 0) {
                const [updatedProductsRow] = await db.query('SELECT p.*, c.category FROM products p JOIN category c ON p.category_id = c.id WHERE p.id = ?', [productId]);
                return updatedProductsRow[0];
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error in updating the stock of the product', error);
            return null;
        }
    },
    findProductDetailsById: async (productId)=>{
        try {
            const [rows] = await db.query('SELECT p.*, c.category FROM products p JOIN category c ON p.category_id = c.id WHERE p.id = ?', [productId]);
            return rows[0]
        } catch (error) {
            console.log('Error in finding the products details by id', error);
        }
    }
}

module.exports = Products