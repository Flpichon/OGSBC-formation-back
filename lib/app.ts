import * as express from "express";
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as exphbs from 'express-handlebars';
import { Routes } from "./config/routes";
import * as cors from 'cors';

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

    constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);

  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }
}

export default new App().app;