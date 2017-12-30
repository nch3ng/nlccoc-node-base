import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import DataAccess from "./models/dataAccess"
import Config from "./config"

export class Server {
  public app;
  private env;
  static env;
  private _config;
  protected static _config;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  constructor(){
    Config.initialize();
    this._config = Config.config;

    this.app = express();
    this.configure();
    this.routes();
    //this.api();
  }

  private configure(){
  
    //require('./models/db.js');
    //require('./config/passport.js');

    //configure ejs
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(morgan('dev'));
    DataAccess.connect();
    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });
  }

  private routes(): void{
    const router = express.Router();
    let api = require('./api');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
    this.app.use('/api', api);
    let static_ng2 = express.static(path.join(__dirname, '../dist'));
    this.app.use(static_ng2);
    this.app.use(['/', '/login', '/register'], function(req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.sendFile('/index.html', { root: path.join(__dirname, '../dist') });
    });
  }
}

