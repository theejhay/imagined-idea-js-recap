import db from '../config/db.js'

// Get All Users
async function getAllUsers(){
    const [rows] = await db.query("SELECT * FROM admin") //  rows, fields
    return rows;
}

// Get user by email

async function getByEmail(email){
    const [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [email]);
    return rows[0];
}

async function getById(id){
    const [rows] = await db.query("SELECT * FROM admin WHERE id = ?", [id]);
    return rows[0];
}

async function createUser(user){
    const {id, name, email, role, password} = user;
    const [result] = await db.query(
        'INSERT INTO admin (id, name, email, role, password) VALUES(?, ?, ?, ?, ?)', [id, name, email, role, password]
    );

    // get Inserted Row
    const [rows] = await db.query("SELECT * FROM admin ORDER BY id DESC LIMIT 1")

    return rows[0];
}

export {getAllUsers, getByEmail, getById, createUser}