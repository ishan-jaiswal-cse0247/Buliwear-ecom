import express from 'express';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Wishlist from '../models/wishlistModel.js';

const wishlistRouter = express.Router();

wishlistRouter.get('/:emid', async (req, res) => {
  const wishlistby_eml = req.params.emid;
  const wishlistby = await Wishlist.find({
    wishlistby: wishlistby_eml,
  });
  if (!wishlistby) {
    return { status: 'error', error: 'Nothing wishlisted yet....' };
  } else {
    res.send(wishlistby);
  }
});

wishlistRouter.get('/checkinwish/:emid', async (req, res) => {
  const wishlistby_eml = req.params.emid;
  const wishlistby = await Wishlist.findOne({
    wishlistby: wishlistby_eml,
    item_id: req.body.id,
  });
  if (!wishlistby) {
    res.send(false);
  } else {
    res.send(true);
  }
});

wishlistRouter.post('/create/:emlid', async (req, res) => {
  const emlid = req.params.emlid;
  const pid = req.body.id;
  const user = await User.findOne({
    email: emlid,
  });
  const checkwish = await Wishlist.findOne({
    wishlistby: emlid,
    item_id: pid,
  });

  if (!user) {
    return { status: 'error', error: 'Invalid email' };
  } else if (checkwish) {
    return { status: 'error', error: 'product alredy exist' };
  } else {
    const product = await Product.findOne({ id: pid });

    await Wishlist.create({
      wishlistby: emlid,
      item_name: product.name,
      image: product.image[0],
      item_id: pid,
    });
  }

  try {
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

wishlistRouter.post('/delete/:emlid', async (req, res) => {
  const emlid = req.params.emlid;
  const pid = req.body.id;
  const user = await User.findOne({
    email: emlid,
  });
  if (!user) {
    return { status: 'error', error: 'Invalid email' };
  } else {
    const product = await Product.findOne({ id: pid });
    await Wishlist.deleteOne({
      wishlistby: emlid,
      item_id: pid,
    });
  }

  try {
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

export default wishlistRouter;
