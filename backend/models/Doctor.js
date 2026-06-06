import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    bio: { type: String, default: '' },
    availability: [
      {
        day: { type: String, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
        slots: [{ type: String }],
      },
    ],
    rating: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
