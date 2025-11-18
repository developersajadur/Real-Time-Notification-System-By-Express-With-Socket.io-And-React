import { Schema, model } from 'mongoose';
import { IMember } from './member.interface';

const memberSchema = new Schema<IMember>(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'Member' },
    capacity: { type: Number, default: 3, min: 0, max: 5 },
  },
  { timestamps: true },
);

export const MemberModel = model<IMember>('Member', memberSchema);
