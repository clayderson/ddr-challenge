import mongoose from '../util/mongoose';

const { Schema } = mongoose;

export default mongoose.model('Recording', new Schema({
  telefone: {
    type: String,
    required: true,
  },

  ramal: {
    type: String,
    required: true,
  },

  dataGravacao: {
    type: Date,
    required: true,
  },
}, {
  timestamps: false,
}));