const fs = require("fs");
const DATA_FILE = "./service/users.json";

function readData(){
    const data = fs.readFileSync(DATA_FILE, "utf8");
    if(!data.trim()){
        return [];
    }
    return JSON.parse(data);
}

function writeData(data){
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const getAll = () => readData();

const createUser = (userData) => {
    const users = readData();
    const date = new Date();
    const newUser = {
        id: Date.now(),
        ...userData,
        dateAdded: date.toISOString()
    }
    users.push(newUser);
    writeData(users);
    return newUser;
}

module.exports = {
    getAll, createUser
}