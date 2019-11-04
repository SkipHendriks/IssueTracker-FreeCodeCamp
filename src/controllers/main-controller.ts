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
}