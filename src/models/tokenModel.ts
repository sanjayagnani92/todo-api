import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const tokenSchema = new Schema<IToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" }, // Automatically delete after 7 days
});

export const Token = mongoose.model<IToken>("Token", tokenSchema);
