import { Request, Response } from 'express';
import IssueModel, { Issue } from '../models/issue.model';
import ProjectModel, { Project } from '../models/project.model';

export default class ApiController {
  public postIssue = async (req: Request, res: Response) => {
    const projectName: string = req.params.project;
    const project: Project = await ProjectModel.findOneByNameOrCreate(projectName);
    const issue: Issue = new IssueModel({ ...req.body, project_id: project._id });
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
      res.type('txt').status(500).send(`could not update ${_id}`);
    }
  };

  public deleteIssue = async (req: Request, res: Response) => {
    const { _id } = req.body;
    if (!_id) {
      res.type('txt').status(400).send('_id error');
    } else {
      try {
        const issue: Issue = await IssueModel.findByIdAndDelete(_id);
        if (issue) {
          res.type('txt').send(`successfully deleted ${_id}`);
        } else {
          throw new Error();
        }
      } catch (error) {
        res.type('txt').status(500).send(`could not delete ${_id}`);
      }
    }
  };

  public getIssues = async (req: Request, res: Response) => {
    const projectName: string = req.params.project;
    try {
      let issues: Array<Issue>;
      if (projectName) {
        const project: Project = await ProjectModel.findOneByName(projectName);
        if (project) {
          issues = await IssueModel.find(
            { project_id: project._id, ...req.body },
          );
        } else {
          res.status(400).type('txt').send('project name doesn\'t exist');
        }
      } else {
        issues = await IssueModel.find({ ...req.body });
      }
      res.json(issues);
    } catch (error) {
      res.status(500).type('txt').send('server error');
    }
  };

  public getProjects = async (req: Request, res: Response) => {
    const { limit } = req.body;
    try {
      const projects: Array<Project> = await ProjectModel.find().limit(limit);
      res.json(projects);
    } catch (error) {
      res.status(500).type('txt').send('server error');
    }
  };
}
