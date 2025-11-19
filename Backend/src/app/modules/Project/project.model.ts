import { Schema, model } from 'mongoose';
import { IProject } from './project.interface';

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const ProjectModel = model<IProject>('Project', projectSchema);
