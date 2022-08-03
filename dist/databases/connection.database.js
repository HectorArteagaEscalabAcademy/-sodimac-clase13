"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = new sequelize_1.Sequelize('typescript', 'root', 'Hect771$', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});
exports.default = database;
//# sourceMappingURL=connection.database.js.map