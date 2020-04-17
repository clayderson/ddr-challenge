import mongoose from '../util/mongoose';

const { Schema } = mongoose;

export interface IMatching extends mongoose.Document {
  recording: string,
  tabulation: string,
}

export default mongoose.model<IMatching>('Matching', new Schema({
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
