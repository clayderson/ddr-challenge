import mongoose from '../util/mongoose';

const { Schema } = mongoose;

export default mongoose.model('Tabulation', new Schema({
  nomeCliente: {
    type: String,
    required: true,
  },

  numeroBinado: {
    type: String,
    required: true,
  },

  numeroAcesso: {
    type: String,
    required: true,
  },

  protocolo: {
    type: String,
    required: true,
    unique: true,
  },

  dataAtendimento: {
    type: Date,
    required: true,
  },
}, {
  timestamps: false,
}));
