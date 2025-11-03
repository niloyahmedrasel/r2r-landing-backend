import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  images?: string[];
  date: string;   
  time: string;  
}

const blogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], 
    },
    time: {
      type: String,
      default: () => {
        const now = new Date();
        return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }); 
      },
    },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.model<IBlog>("Blog", blogSchema);
