import express from 'express';
import Product from '../models/productModel.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Bought from '../models/boughtModel.js';
import Wishlist from '../models/wishlistModel.js';
const productRouter = express.Router();
const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const filename =
      Date.now() + file.originalname.toLowerCase().split(' ').join('-');
    callback(null, filename);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { folder: 'Product' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
  });
}

productRouter.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.send(products);
});

productRouter.get('/adimg', async (req, res) => {
  const product = await Product.findOne().sort({ createdAt: -1 }).limit(1);
  res.send(product);
});

productRouter.get('/id/:id', async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/chartdata/:id', async (req, res) => {
  const bought_count = await Bought.find({ item_id: req.params.id }).count();
  const wish_count = await Wishlist.find({ item_id: req.params.id }).count();
  const counted_data = [
    { type_data: 'Time_Purchased', count_data: bought_count },
    { type_data: 'Time_Wishlisted', count_data: wish_count },
  ];
  if (counted_data) {
    res.send(counted_data);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.post('/create', upload.array('image', 7), async (req, res) => {
  //const imag = req.body.image.name;
  const reqFiles = [];
  //const url = req.protocol + '://' + req.get('host');
  for (var i = 0; i < req.files.length; i++) {
    const url = await uploadToCloudinary(req.files[i]);
    reqFiles.push(url);
  }

  try {
    await Product.create({
      name: req.body.name,
      id: req.body.id,
      image: reqFiles,
      brand: req.body.brand,
      link: req.body.link,
      link0: req.body.link0,
      link1: req.body.link1,
      size: req.body.size,
      labelsize: req.body.labelsize,
      sex: req.body.sex,
      description: req.body.description,
      oldprice: req.body.oldprice,
      price: req.body.price,
    });
  } catch (err) {
    res.json({ status: 'error', error: 'error' });
  }
});

productRouter.post('/update', upload.array('image', 16), async (req, res) => {
  const reqFiles = [];
  for (var i = 0; i < req.files.length; i++) {
    const url = await uploadToCloudinary(req.files[i]);
    reqFiles.push(url);
  }

  try {
    await Product.updateOne(
      {
        id: req.body.id,
      },
      {
        name: req.body.prdname,
        image: reqFiles,
        brand: req.body.brand,
        link: req.body.link,
        link0: req.body.link0,
        link1: req.body.link1,
        size: req.body.size,
        labelsize: req.body.labelsize,
        sex: req.body.sex,
        description: req.body.description,
        oldprice: req.body.oldprice,
        price: req.body.price,
      }
    );
  } catch (err) {
    res.json({ status: 'error', error: 'error' });
  }
});

productRouter.post('/delete', async (req, res) => {
  //console.log(req.body);
  try {
    await Product.deleteOne({
      id: req.body.id,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Product Not found' });
  }
});

export default productRouter;
