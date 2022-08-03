import express, { Application } from 'express';
import usersRoutes from '../routes/user.route';
import cors from 'cors';
import database from '../database/connection.database';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = { users: '/api/users' };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.databaseConnection();
        this.middlewares();
        this.routes();
    }

    async databaseConnection() {

        try {
            await database.authenticate();
        } catch (err) {
            throw new Error();
        }

    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

    routes() {
        this.app.use(this.apiPaths.users, usersRoutes);
    }

}

export default Server;

