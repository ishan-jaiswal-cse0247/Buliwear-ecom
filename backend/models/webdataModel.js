import mongoose from 'mongoose';

const webdataSchema = new mongoose.Schema(
  {
    hero_img: { type: String, required: true },
    home_img1: { type: String, required: true },
    about_img: { type: String, required: true },
    contact_img: { type: String, required: true },
    forgot_img: { type: String, required: true },
    ad_imgs: { type: Array, required: true },
    home_text0: { type: Array, required: true },
    home_text1: { type: Array, required: true },
    privacy_text: { type: String, required: true },
    about_text: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Webdata = mongoose.model('Webdata', webdataSchema);
export default Webdata;
