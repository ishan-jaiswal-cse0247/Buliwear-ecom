//Schema for all of the wishlisted products by every user

import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    wishlistby: { type: String, required: true },
    item_name: { type: String, required: true },
    image: { type: String, required: true },
    item_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
