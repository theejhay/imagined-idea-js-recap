const fs = require("fs").promises;
const DATA_FILE = "./repository/users.json";

async function readData() {
  const data = await fs.readFile(DATA_FILE, "utf8");
  console.log(data)
  if (!data.trim()) {
    return [];
  }
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const getAll = async () => {
  const users = await readData();
  return users;
}

const createUser = (userData) => {
  const users = readData();
  const date = new Date();
  const newUser = {
    id: Date.now(),
    ...userData,
    dateAdded: date.toISOString(),
  };
  users.push(newUser);
  writeData(users);
  return newUser;
};

const updateUser = (id, updates) => {
  const users = readData();
  const index = users.findIndex(user => user.id === Number(id));
  if (index === -1) return null;

   users[index] = {
    id: users[index].id,
    name: updates.name,
    age: updates.age,
    dateAdded: users[index].dateAdded,
   }
   writeData(users);
   return users[index];
};

const patchUser = (id, updates) => {
  const users = readData();
  const index = users.findIndex(user => user.id === Number(id));
  if (index === -1) return null;

   users[index] = { ...users[index], ...updates };
   writeData(users);
   return users[index];
};

const deleteUser = (id) => {
    const users = readData();
    const filtered = users.filter(user => user.id !== Number(id))
    if (users.length === filtered.length) return null;
    writeData(filtered);
    return true
}

module.exports = {
  getAll,
  createUser,
  updateUser,
  patchUser,
  deleteUser
};
