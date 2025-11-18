import { Schema, model } from 'mongoose';
import { ITask } from './task.interface';

const taskSchema = new Schema<ITask>(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },

    title: { type: String, required: true },
    description: { type: String },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      default: null,
    },

    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },

    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Done'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

export const TaskModel = model<ITask>('Task', taskSchema);
