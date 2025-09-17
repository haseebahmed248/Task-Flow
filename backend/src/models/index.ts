import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import process from "process";

// Load config.json
const basename = path.basename(__filename);
const env = process.env['NODE_ENV'] 
|| "development";
// 👇 import JSON config like this
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(path.resolve(__dirname, "../config/config.json"))[env];

const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Auto-load all models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && // ignore hidden files
      file !== basename && // ignore this file
      (file.endsWith(".ts") || file.endsWith(".js")) && // support TS & JS
      !file.endsWith(".test.ts") &&
      !file.endsWith(".test.js")
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
  });

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
