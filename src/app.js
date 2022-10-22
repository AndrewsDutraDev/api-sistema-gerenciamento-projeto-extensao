import express from 'express';
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
  }

  // Chama o arquivo de rotas
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
