import mongoose, { Schema, Document } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

import ObjectId = Schema.Types.ObjectId;


export interface IIssue extends Document {
  issue_title: String,
  issue_text: String,
  created_by: String,
  assigned_to: String,
  open: String,
  status_text: String,
  project_id: ObjectId
}

const IssueSchema: Schema = new Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String },
  open: { type: Boolean, required: true, default: true },
  status_text: { type: String },
  project_id: { type: ObjectId, required: true },
});

IssueSchema.plugin(mongooseHidden({ defaultHidden: { __v: true } }));

export default mongoose.model<IIssue>('Issue', IssueSchema);
