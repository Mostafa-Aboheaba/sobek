import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVesselSchedule extends Document {
  vesselName: string;
  pol: string;
  polCode: string;
  pod: string;
  podCode: string;
  eta: Date;
  etd: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VesselScheduleSchema: Schema = new Schema(
  {
    vesselName: {
      type: String,
      required: true,
      trim: true,
    },
    pol: {
      type: String,
      required: true,
      trim: true,
    },
    polCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    pod: {
      type: String,
      required: true,
      trim: true,
    },
    podCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    eta: {
      type: Date,
      required: true,
    },
    etd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common filters (origin, destination, dates)
VesselScheduleSchema.index({ polCode: 1, podCode: 1 });
VesselScheduleSchema.index({ eta: 1 });
VesselScheduleSchema.index({ etd: 1 });

const VesselSchedule: Model<IVesselSchedule> =
  mongoose.models.VesselSchedule ||
  mongoose.model<IVesselSchedule>("VesselSchedule", VesselScheduleSchema);

export default VesselSchedule;
