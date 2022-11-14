import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("db.json");
let db = low(adapter);

// @ts-ignore
// const ___dirname = dirname(fileURLToPath(import.meta.url));
// const ___dirname = dirname(fileURLToPath());

db.defaults({ posts: [], user: {} }).write();

// let db: Low<Data>
const test = () => {
  (db.get("posts") as any).push({ id: 1, title: "lowdb is awesome" }).write();

  // Set a user using Lodash shorthand syntax
  db.set("user.name", "typicode").write();
};

async function createConnection() {}

export const getConnection = () => db;

export { createConnection, test };
