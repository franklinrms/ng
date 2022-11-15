import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  private config():void {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}