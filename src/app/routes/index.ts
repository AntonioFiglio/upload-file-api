import { Router } from 'express';
import UploadController from '../controllers/upload';

const Routes = Router();

Routes.post('/upload', UploadController.uploadOne);

export default Routes;
