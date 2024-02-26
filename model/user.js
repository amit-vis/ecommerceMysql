const db = require('../config/database');

const User = {
    register: async (user)=>{
        try {
            const [userRows] = await db.query('INSERT INTO user (name, email, password) VALUES (?,?,?)',
            [user.name, user.email, user.password]);
            return userRows.insertId
        } catch (error) {
            console.log("Error in Register the user", error)
        }
    },
    findUser: async (email)=>{
        try {
            const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
            return rows
        } catch (error) {
            console.log("Error in finding the email of the user", error)
        }
    },
    findPassUser: async (pass, email)=>{
        try {
            const [rows]= await db.query('SELECT * FROM user WHERE password = ? AND email = ?', [pass,email]);
            return rows
        } catch (error) {
            console.log("Error in finding the email and password", error)
        }
    },
    findById: async (user_id)=>{
        try {
            const [rows]= await db.query('SELECT * FROM user WHERE id = ?', [user_id]);
            return rows
        } catch (error) {
            console.log("Error in finding the user by id", error)
        }
    }
}

module.exports = User;