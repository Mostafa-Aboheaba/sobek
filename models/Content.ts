import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContent extends Document {
  section: string;
  key: string;
  content: string;
  type: "text" | "html" | "image" | "link";
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema: Schema = new Schema(
  {
    section: {
      type: String,
      required: true,
      index: true,
    },
    key: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "html", "image", "link"],
      default: "text",
    },
    updatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for section + key uniqueness
ContentSchema.index({ section: 1, key: 1 }, { unique: true });

const Content: Model<IContent> =
  mongoose.models.Content ||
  mongoose.model<IContent>("Content", ContentSchema);

export default Content;

