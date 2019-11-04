import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  name: string;
}

export interface IProjectModel extends Model<IProject> {
  findOneByNameOrCreate(name: string): Promise<IProject>;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }
});

ProjectSchema.statics.findOneByNameOrCreate = async function (name: string): Promise<IProject> {
  const project: IProject = await this.findOne({ name });
  return project || this.create({ name });
};

export default mongoose.model<IProject, IProjectModel>('Project', ProjectSchema);
