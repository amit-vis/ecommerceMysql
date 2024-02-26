const db = require('../config/database');

module.exports.Category = {
    create: async (category) => {
        try {
            const [result] = await db.query('INSERT INTO category (category) VALUES (?)', [category]);
            return result.insertId
        } catch (error) {
            console.log('Error in inserting category', error);
        }
    },
    findCategory: async (category) => {
        try {
            const [rows] = await db.query('SELECT * FROM category WHERE category = ?', [category]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log('Error in finding category', error);
        }
    },

    findAllCategory: async ()=>{
        try {
            const [rows]= await db.query('SELECT * FROM category');
            return rows
        } catch (error) {
            console.log('Error in finding all category', error);
        }
    },
    findCategoryBYid: async (id)=>{
        try {
            const [rows] = await db.query('SELECT * FROM category WHERE id = ?', [id]);
            return rows.length> 0 ? rows[0] : null;
        } catch (error) {
            console.log('Error in finding category id', error);
        }
    }

}