import express from 'express';
import Product from '../models/productModel.js';
import multer from 'multer';
const productRouter = express.Router();
const DIR = '../frontend/build/assets/media/Product/';
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, DIR);
  },
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

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/id/:id', async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.post('/create', upload.array('image', 7), async (req, res) => {
  //console.log(req.body);
  //const imag = req.body.image.name;
  const reqFiles = [];
  //const url = req.protocol + '://' + req.get('host');
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(`/assets/media/Product/${req.files[i].filename}`);
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
    reqFiles.push(`/assets/media/Product/${req.files[i].filename}`);
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
