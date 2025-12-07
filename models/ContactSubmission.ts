import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactSubmission extends Document {
  name: string;
  phone: string;
  email: string;
  address?: string;
  requests?: string;
  helpOptions: string[];
  status: "new" | "contacted" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    requests: {
      type: String,
    },
    helpOptions: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "resolved"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);

export default ContactSubmission;

