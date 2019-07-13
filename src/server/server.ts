import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

export class VPSServer {
  readonly app: express.Application;
  readonly env: 'Dev' | 'Prod' = 'Dev';
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/', express.static(path.join(process.cwd(), 'build')));
    this.init_route();
    this.init_server();
  }
  init_route(): void {
    this.app.get('/*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      return res.sendFile('index.html', { root: path.join(process.cwd(), 'build') }, (err) => {
        if (err) {
          return res.redirect('/');
        }
      });
    });
  }
  init_server(): void {
    let port: number = (this.env === 'Dev') ? 1800 : 80;
    let host: string = (this.env === 'Dev') ? 'localhost' : '0.0.0.0';
    this.app.listen(port, host, () => {
      console.debug(`Application hosted on ${host} and listen at port ${port}`);
    });
  }
}
new VPSServer();
