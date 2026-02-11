import fs from "fs/promises";

const DATA_FILE = "./repository/blacklist_token.json";

async function readData() {
  const data = await fs.readFile(DATA_FILE, "utf8");
  if (!data.trim()) {
    return [];
  }
  return JSON.parse(data);
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function addToken(token, expiresAt){
  const list = await readData();

  list.push({token,expiresAt});
  await writeData(list);
}

async function isBlacklisted(token) {
  const list = await readData();
  return list.some(entry => entry.token === token);
}

async function cleanupExpiredToken(){
  const now = Date.now();
  const list = await readData();
  const valid = list.filter(t => t.expiresAt > now);
  await writeData(valid);
}


export { addToken, isBlacklisted, cleanupExpiredToken };
