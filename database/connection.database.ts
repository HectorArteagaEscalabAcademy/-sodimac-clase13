import { Sequelize } from "sequelize";

const database = new Sequelize('typescript', 'root', 'Hect771$', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

export default database;

