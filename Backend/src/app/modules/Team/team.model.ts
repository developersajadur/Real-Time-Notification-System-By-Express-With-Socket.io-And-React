import { Schema, model } from 'mongoose';
import { ITeam } from './team.interface';

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const TeamModel = model<ITeam>('Team', teamSchema);
