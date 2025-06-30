import bcrypt from "bcryptjs";
import { Document, Schema, model } from "mongoose";

export interface ISeller extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  storeName: string;
  role: "seller";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const sellerSchema = new Schema<ISeller>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  storeName: { type: String, required: true },
  role: { type: String, default: "seller", enum: ["seller"] },
});

//  hash password
sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(this.password, saltRounds);
    this.password = hashed;
    next();
  } catch (err) {
    next(err as Error);
  }
});

// compare passwords
sellerSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const Seller = model<ISeller>("Seller", sellerSchema);
