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

async function getByuuid(uuid){
    const [rows] = await db.query("SELECT * FROM admin WHERE uuid = ?", [uuid]);
    return rows[0];
}

async function createUser(user){
    const {uuid, name, email, role, password} = user;
    const [result] = await db.query(
        'INSERT INTO admin (uuid, name, email, role, password) VALUES(?, ?, ?, ?, ?)', [uuid, name, email, role, password]
    );

    const insertedId = result.insertId;

    // get Inserted Row
    const [rows] = await db.query("SELECT * FROM admin WHERE id = ?", [insertedId])
    return rows[0];
}

async function updateRefreshToken(uuid, refreshToken){
    await db.query("UPDATE admin SET refresh_token = ? WHERE uuid = ? ", [ refreshToken, uuid ]);
}

async function getByRefreshToken(refreshToken){
    const [rows] = await db.query("SELECT * FROM admin WHERE refresh_token = ?", [refreshToken]);
    return rows[0];
}

export {getAllUsers, getByEmail, getByuuid, createUser, updateRefreshToken, getByRefreshToken}