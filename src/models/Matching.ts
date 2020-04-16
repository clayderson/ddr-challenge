import mongoose from '../util/mongoose';

const { Schema } = mongoose;

export default mongoose.model('Matching', new Schema({
  recording: {
    type: Schema.Types.ObjectId,
    ref: 'Recording',
    required: true,
  },

  tabulation: {
    type: Schema.Types.ObjectId,
    ref: 'Tabulation',
    required: true,
  }
}, {
  timestamps: true,
}));
