import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ActivateUserController from './app/controllers/ActivateUserController';
import FileController from './app/controllers/FileController';
import CompanyController from './app/controllers/CompanyController';
import CategoryController from './app/controllers/CategoryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/active-user', ActivateUserController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);

routes.post('/companies', CompanyController.store);
routes.get('/category/:categoryId/companies', CompanyController.index);
routes.get('/category/:categoryId/company/:companyId', CompanyController.index);
routes.put('/company/:companyId', CompanyController.update);
routes.delete('/company/:companyId', CompanyController.delete);

export default routes;
