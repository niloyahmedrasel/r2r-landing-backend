import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDemo extends Document {
  name: string;
  email: string;
  company: string;
}

const demoSchema: Schema<IDemo> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const DemoModel = mongoose.model<IDemo>("Demo", demoSchema);
