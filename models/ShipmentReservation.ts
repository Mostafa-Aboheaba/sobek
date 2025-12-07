import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShipmentReservation extends Document {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  origin: string;
  destination: string;
  cargoType: string;
  cargoWeight?: number;
  cargoDescription?: string;
  preferredDate: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const ShipmentReservationSchema: Schema = new Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    cargoType: {
      type: String,
      required: true,
    },
    cargoWeight: {
      type: Number,
    },
    cargoDescription: {
      type: String,
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ShipmentReservation: Model<IShipmentReservation> =
  mongoose.models.ShipmentReservation ||
  mongoose.model<IShipmentReservation>("ShipmentReservation", ShipmentReservationSchema);

export default ShipmentReservation;

