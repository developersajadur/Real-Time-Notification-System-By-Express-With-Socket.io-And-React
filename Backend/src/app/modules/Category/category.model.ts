import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      uppercase: true,
      trim: true,
      minlength: [3, 'Category name must be at least 3 characters long'],
      maxlength: [30, 'Category name cannot exceed 30 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: String,
      enum: {
        values: ['SYSTEM', 'ADMIN'],
        message: 'createdBy must be either SYSTEM or ADMIN',
      },
      default: 'SYSTEM',
    },
  },
  {
    timestamps: true,
  },
);

export const Category = model<ICategory>('Category', categorySchema);
