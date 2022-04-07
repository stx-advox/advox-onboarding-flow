import { Schema, model } from "mongoose";

interface IBNSUpdate {
  identityId: string;
  newName: string;
}

const schema = new Schema<IBNSUpdate>({
  identityId: { type: String, required: true },
  newName: { type: String, required: true },
});

export const BNSUpdate = model<IBNSUpdate>("BNSUpdate", schema);
