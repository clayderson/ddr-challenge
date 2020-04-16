import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/helpdesk', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

export default mongoose;
