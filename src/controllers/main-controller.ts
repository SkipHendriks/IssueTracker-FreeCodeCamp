import { Request, Response } from 'express';
import IssueModel, { IIssue } from '../models/issue.model';

export default class ApiController {
  public postIssue = async (req: Request, res: Response) => {
    const issue: IIssue = new IssueModel(req.body);
    try {
      await issue.save();
      res.json(issue);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public putIssue = async (req: Request, res: Response) => {
    try {
      const issue = await IssueModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, upsert: false });
      if(issue){
        res.json(issue);
      } else {
        res.status(400).json({ error: '_id not found' });
      }
    } catch (error) {
      if(error.name === "CastError"){
        res.status(400).json({error: '_id invalid'});
      } else {
        res.status(500).json({error: 'Internal server error'});
      }
    }
  }
}