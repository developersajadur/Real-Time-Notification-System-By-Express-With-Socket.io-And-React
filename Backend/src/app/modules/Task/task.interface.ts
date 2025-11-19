import { Types } from 'mongoose';

export type TPriority = 'Low' | 'Medium' | 'High';
export type TStatus = 'Pending' | 'In Progress' | 'Done';

export interface ITask {
  _id?: Types.ObjectId;
  project: Types.ObjectId;
  title: string;
  description?: string;
  assignedTo?: Types.ObjectId | null; // MemberRef
  priority: TPriority;
  status: TStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
