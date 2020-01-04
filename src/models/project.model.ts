import mongoose, { Schema, Document, Model } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

export interface Project extends Document {
  name: string;
}

interface ProjectModel extends Model<Project> {
  findOneByNameOrCreate(name: string): Promise<Project>;
  findOneByName(name: string): Promise<Project>;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

/* eslint-disable func-names */
ProjectSchema.statics.findOneByNameOrCreate = async function (name: string): Promise<Project> {
  const project: Project = await this.findOne({ name });
  return project || this.create({ name });
};

ProjectSchema.statics.findOneByName = async function (name: string): Promise<Project> {
  return this.findOne({ name });
};
/* eslint-enable func-names */


ProjectSchema.plugin(mongooseHidden({ defaultHidden: { __v: true } }));

export default mongoose.model<Project, ProjectModel>('Project', ProjectSchema);
