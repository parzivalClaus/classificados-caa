import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ActivateUserController from './app/controllers/ActivateUserController';
import FileController from './app/controllers/FileController';
import CompanyController from './app/controllers/CompanyController';
import CategoryController from './app/controllers/CategoryController';
import RecoveryPassController from './app/controllers/RecoveryPassController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.get('/users/:userId', UserController.index);
routes.get('/users', UserController.index);
routes.post('/sessions', SessionController.store);
routes.get('/active-user', ActivateUserController.index);
routes.post('/recovery-password', RecoveryPassController.store);
routes.get('/recovery-password', RecoveryPassController.index);

routes.use(authMiddleware);

routes.put('/users/:id', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);

routes.post('/companies', CompanyController.store);
routes.get('/companies', CompanyController.index);
routes.get('/category/:categoryId/companies', CompanyController.index);
routes.get('/category/:categoryId/company/:companyId', CompanyController.index);
routes.get('/user/:userId/company', CompanyController.index);
routes.put('/company/:companyId', CompanyController.update);
routes.delete('/company/:companyId', CompanyController.delete);

export default routes;
