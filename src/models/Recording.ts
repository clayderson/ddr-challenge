import mongoose from '../util/mongoose';

const { Schema } = mongoose;

export interface IRecording extends mongoose.Document {
  phone: string,
  branch: string,
  recordedAt: Date,
}

export default mongoose.model<IRecording>('Recording', new Schema({
  phone: {
    type: String,
    required: true,
  },

  branch: {
    type: String,
    required: true,
  },

  recordedAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
}));
