// Car Schema page with car model
import { Schema, model, Document, Types } from "mongoose";

export interface ICar {
  brand: string;
  model: string;
  price: number;
  availability: boolean;
  condition: string;
  color: string;
  year: Number;
  image: String;
  category: Types.ObjectId; // Use Types.ObjectId for clarity
}

const carSchema = new Schema<ICar>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    condition: { type: String },
    color: { type: String },
    year: { type: Number, require: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export default model<ICar>("Car", carSchema);
