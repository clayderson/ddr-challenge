import mongoose from '../util/mongoose';

const { Schema } = mongoose;

export default mongoose.model('Recording', new Schema({
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
