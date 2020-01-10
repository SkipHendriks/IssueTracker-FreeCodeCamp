import mongoose, { Schema, Document } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

import ObjectId = Schema.Types.ObjectId;


export interface Issue extends Document {
  issue_title: string,
  issue_text: string,
  created_by: string,
  assigned_to: string,
  open: boolean,
  status_text: string,
  project_id: ObjectId,
  updated_on: Date
}

const IssueSchema: Schema = new Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String },
  open: { type: Boolean, required: true, default: true },
  status_text: { type: String },
  project_id: { type: ObjectId, required: true },
}, { timestamps: { updatedAt: 'updated_on', createdAt: 'created_on' } });

IssueSchema.plugin(mongooseHidden({ defaultHidden: { __v: true } }));

export default mongoose.model<Issue>('Issue', IssueSchema);
