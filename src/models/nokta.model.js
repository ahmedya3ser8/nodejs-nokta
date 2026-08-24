import mongoose, { Schema } from "mongoose";

const noktaSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 1
    },
    transactionType: {
      type: String,
      enum: ['received', 'given'],
      required: true,
    },
    occasionType: {
      type: String,
      enum: ['wedding', 'engagement', 'birthday', 'other'],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    person: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      required: true
    },
  },
  { timestamps: true }
);

const Nokta = mongoose.model('Nokta', noktaSchema);

export default Nokta;
