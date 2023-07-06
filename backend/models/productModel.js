//Product details model for all of the details about the product

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    image: { type: Array, required: true },
    brand: { type: String, required: true },
    link: { type: String, required: true },
    link0: { type: String },
    link1: { type: String },
    size: { type: String, required: true },
    labelsize: { type: String, required: true },
    sex: { type: String, required: true },
    description: { type: String, required: true },
    oldprice: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
