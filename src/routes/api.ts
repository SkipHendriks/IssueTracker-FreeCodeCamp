import { Router } from 'express';
import requestValidator from '../middleware/validator';
import { Post, Put } from '../middleware/validation-classes';
import ApiController from '../controllers/main-controller';


const apiRouter = Router();

const apiController = new ApiController();

apiRouter.get('/api/issues/:project', (req, res) => {

});

apiRouter.post('/api/issues/:project', requestValidator(Post), apiController.postIssue);

apiRouter.put('/api/issues/:project', requestValidator(Put), apiController.putIssue);

apiRouter.delete('/api/issues/:project', function (req, res){
    var project = req.params.project;
});

export default apiRouter;
