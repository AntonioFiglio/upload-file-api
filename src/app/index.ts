import Express from 'express';
import Cors from 'cors';
import Routes from './routes';

const APP = Express();

APP.use(Cors());
APP.use(Express.urlencoded({ extended: true }));
APP.use(Express.json());
APP.use('/api', Routes);

export default APP;
