import express from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  // Chama os middlewares
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  // Chama o arquivo de rotas
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
