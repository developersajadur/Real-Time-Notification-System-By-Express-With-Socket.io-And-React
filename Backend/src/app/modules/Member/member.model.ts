import { Schema, model } from 'mongoose';
import { IMember } from './member.interface';

const memberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    capacity: { type: Number, required: true, min: 0, max: 5 },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
  },
  { timestamps: true },
);

export const MemberModel = model<IMember>('Member', memberSchema);
