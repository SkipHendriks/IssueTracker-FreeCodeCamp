import { Router } from 'express';
import requestValidator from '../middleware/validator';
import { Post, Put, Get } from '../middleware/validation-classes';
import ApiController from '../controllers/main-controller';
import requestCleaner from '../middleware/request-cleaner';


const apiRouter = Router();

const apiController = new ApiController();

apiRouter.use(requestCleaner);

apiRouter.get('/api/issues/:project', requestValidator(Get), apiController.getIssues);

apiRouter.post('/api/issues/:project', requestValidator(Post), apiController.postIssue);

apiRouter.put('/api/issues/:project', requestValidator(Put), apiController.putIssue);

apiRouter.delete('/api/issues/:project', apiController.deleteIssue);

export default apiRouter;
