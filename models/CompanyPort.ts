import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompanyPort extends Document {
  name: string;
  code: string;
  displayOrder?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CompanyPortSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

CompanyPortSchema.index({ code: 1 });
CompanyPortSchema.index({ displayOrder: 1 });

const CompanyPort: Model<ICompanyPort> =
  mongoose.models.CompanyPort ||
  mongoose.model<ICompanyPort>("CompanyPort", CompanyPortSchema);

export default CompanyPort;
