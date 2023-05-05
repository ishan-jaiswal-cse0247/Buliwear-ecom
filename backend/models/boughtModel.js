import mongoose from 'mongoose';

const boughtSchema = new mongoose.Schema(
  {
    boughtby: { type: String, required: true },
    item_name: { type: String, required: true },
    image: { type: String, required: true },
    item_id: { type: String, required: true },
    item_count: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Bought = mongoose.model('Bought', boughtSchema);
export default Bought;
