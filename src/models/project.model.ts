import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
}

export interface IProjectModel extends Model<IProject> {
  findOneByNameOrCreate(name: string): Promise<IProject>;
  findOneByName(name: string): Promise<IProject>;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

/* eslint-disable func-names */
ProjectSchema.statics.findOneByNameOrCreate = async function (name: string): Promise<IProject> {
  const project: IProject = await this.findOne({ name });
  return project || this.create({ name });
};

ProjectSchema.statics.findOneByName = async function (name: string): Promise<IProject> {
  return this.findOne({ name });
};
/* eslint-enable func-names */

export default mongoose.model<IProject, IProjectModel>('Project', ProjectSchema);
