//This route sends all the purchased product details as per the current user email

import express from 'express';
import Bought from '../models/boughtModel.js';

const boughtRouter = express.Router();

boughtRouter.get('/:emid', async (req, res) => {
  const boughtby_eml = req.params.emid;
  const boughtby = await Bought.find({
    boughtby: boughtby_eml,
  }).sort({ createdAt: -1 });
  if (!boughtby) {
    return { status: 'error', error: 'Nothing purchased' };
  } else {
    res.send(boughtby);
  }
});

export default boughtRouter;
