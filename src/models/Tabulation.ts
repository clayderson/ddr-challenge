import mongoose from '../util/mongoose';

const { Schema } = mongoose;

export default mongoose.model('Tabulation', new Schema({
  clientName: {
    type: String,
    required: true,
  },

  binedPhone: {
    type: String,
    required: true,
  },

  accessPhone: {
    type: String,
    required: true,
  },

  protocol: {
    type: String,
    required: true,
    unique: true,
  },

  calledAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
}));
