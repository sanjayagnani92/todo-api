import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  createdAt: Date;
  dueDate: Date;
  description?: string;
  completed?: boolean;
  updatedAt?: Date;
  updatedBy?: mongoose.Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },

  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

todoSchema.set("toJSON", {
  versionKey: false,
});
export const Todo = mongoose.model<ITodo>("Todo", todoSchema);
