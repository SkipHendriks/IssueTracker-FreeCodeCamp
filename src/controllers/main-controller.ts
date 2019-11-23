import { Request, Response } from 'express';
import IssueModel, { IIssue } from '../models/issue.model';
import ProjectModel, { IProject, IProjectModel } from '../models/project.model';

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
      const issue = await IssueModel.findOneAndUpdate(
        { _id },
        updates,
        { new: true, upsert: false },
      );
      if (issue) {
        res.type('txt').send(`successfully updated ${_id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      res.type('txt').send(`could not update ${_id}`);
    }
  };

  public deleteIssue = async (req: Request, res: Response) => {
    const { _id } = req.body;
    if (!_id) {
      res.type('txt').send('_id error');
    } else {
      try {
        const issue: IIssue = await IssueModel.findByIdAndDelete(_id);
        if (issue) {
          res.type('txt').send(`successfully deleted ${_id}`);
        } else {
          throw new Error();
        }
      } catch (error) {
        res.type('txt').send(`could not delete ${_id}`);
      }
    }
  };

  public getIssues = async (req: Request, res: Response) => {
    const projectName: string = req.params.project;
    try {
      const project: IProject = await ProjectModel.findOneByName(projectName);
      if (project) {
        const issues: Array<IIssue> = await IssueModel.find(
          { project_id: project._id, ...req.body },
        );
        res.json(issues);
      } else {
        res.status(400).type('txt').send('project name doesn\'t exist');
      }
    } catch (error) {
      res.status(500).type('txt').send('server error');
    }
  };

  public getProjects = async (req: Request, res: Response) => {
    const { limit } = req.body;
    try {
      const projects: Array<IProject> = await ProjectModel.find().limit(limit);
      console.log(projects);
      res.json(projects);
      
    } catch (error) {
      res.status(500).type('txt').send('server error');
    }
  };
}
