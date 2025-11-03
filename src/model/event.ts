import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  images: string[]; 
}

const eventSchema: Schema<IEvent> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    date: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    organizer: {
      type: String,
      required: [true, "Organizer name is required"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const EventModel = mongoose.model<IEvent>("Event", eventSchema);
