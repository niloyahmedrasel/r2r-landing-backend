import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

const contactSchema: Schema<IContact> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const ContactModel = mongoose.model<IContact>("Contact", contactSchema);
