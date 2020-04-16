import mongoose from '../util/mongoose';

const { Schema } = mongoose;

export default mongoose.model('Matching', new Schema({
  gravacao: {
    type: Schema.Types.ObjectId,
    ref: 'Gravacao',
    required: true,
  },

  tabulacao: {
    type: Schema.Types.ObjectId,
    ref: 'Tabulacao',
    required: true,
  }
}, {
  timestamps: false,
}));
