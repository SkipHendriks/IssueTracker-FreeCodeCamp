import { Request, Response } from 'express';
import IssueModel, { IIssue } from '../models/issue.model';
import ProjectModel, { IProject } from '../models/project.model';

export default class ApiController {
  public postIssue = async (req: Request, res: Response) => {
    const projectName: string = req.params.project;
    const project: IProject = await ProjectModel.findOneByNameOrCreate(projectName);
    const issue: IIssue = new IssueModel({ ...req.body, project_id: project._id });
    try {
      await issue.save();
      res.json(issue);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public putIssue = async (req: Request, res: Response) => {
    const { _id, ...updates } = req.body;
    try {
      const issue = await IssueModel.findOneAndUpdate({ _id }, updates, { new: true, upsert: false });
      if (issue) {
        res.type('txt').send(`successfully updated ${_id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      res.type('txt').send(`could not update ${_id}`);
    }
  };
}
