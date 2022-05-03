import { Schema, model } from "mongoose";

interface IGrainInfo {
  lastCycleId: number;
}

const schema = new Schema({
  lastCycleId: {
    type: Number,
    required: true,
  },
});

export const GrainInfo = model<IGrainInfo>("GrainInfo", schema);
