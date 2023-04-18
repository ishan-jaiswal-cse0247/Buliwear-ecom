import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Bought from '../models/boughtModel.js';
import nodemailer from 'nodemailer';

const userRouter = express.Router();
const businessmail = 'buliwear.ecom@gmail.com';
const businessmailpass = 'imiwjlobtfwuoyes';

userRouter.post('/signin', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: 'error', error: 'Invalid login' };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'secret123'
    );

    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

userRouter.post('/signup', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    return { status: 'error', error: 'Duplicate email' };
  }

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Error' });
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${businessmail}`,
      pass: `${businessmailpass}`,
    },
  });

  var mailOptions = {
    from: `${businessmail}`,
    to: `${req.body.email}`,
    subject: 'Welcome to Buliwear',
    text: `Hi ${req.body.name}, Thank you for joining our Buliwear Family.`,
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

userRouter.get('/email', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secret123');
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: 'ok', usremail: user.email });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

userRouter.get('/isAdmin', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secret123');
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: 'ok', isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

userRouter.get('/name', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secret123');
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: 'ok', name: user.name });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

userRouter.post('/update', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await User.updateOne(
      {
        email: req.body.email,
      },
      {
        name: req.body.usrname,
        password: hashedPassword,
      }
    );
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'error' });
  }
});

userRouter.post('/reseteml', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json({ status: 'error' });
  }
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${businessmail}`,
        pass: `${businessmailpass}`,
      },
    });

    var mailOptions = {
      from: `${businessmail}`,
      to: `${req.body.email}`,
      subject: 'Password reset link from Buliwear',
      text: `To reset your password just click on this link - https://fluffy-teal-giraffe.cyclic.app/ForgotPass/${req.body.email}
      Buliwear`,
      // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error' });
  }
});

userRouter.post('/resetpass/:emlid', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    await User.updateOne(
      {
        email: req.params.emlid,
      },
      {
        password: hashedPassword,
      }
    );
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${businessmail}`,
        pass: `${businessmailpass}`,
      },
    });

    var mailOptions = {
      from: `${businessmail}`,
      to: `${req.params.emlid}`,
      subject: 'Password changed of your Buliwear account',
      text: `Password of your account ${req.params.emlid} has been changed as requested.
      Buliwear`,
      // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'error' });
  }
});

userRouter.post('/delete', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: 'error', error: 'Invalid login' };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    await User.deleteOne({ email: req.body.email });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${businessmail}`,
        pass: `${businessmailpass}`,
      },
    });

    var mailOptions = {
      from: `${businessmail}`,
      to: `${req.body.email}`,
      subject: 'Deleated your account from Buliwear',
      text: `Your account ${req.body.email} from Buliwear has been deleated as per your request "${req.body.whymessage}", And we are taking action upon your feedback. 
      Thank you for being with use and if you change your mind you can join our Buliwear Family at any time.
      Hope to see you again.
      
      Buliwear`,
      // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res.json({ status: 'ok' });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

userRouter.post('/contact', async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${businessmail}`,
      pass: `${businessmailpass}`,
    },
  });

  var mailOptions = {
    from: `${businessmail}`,
    to: `${businessmail}`,
    subject: `${req.body.name} contacted from Buliwear`,
    text: `Name:- ${req.body.name} 
    Email:- ${req.body.email}
    Message:- ${req.body.message} `,
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({ status: 'ok' });
    }
  });
});

userRouter.post('/sendnews', async (req, res) => {
  console.log(req.body);
  try {
    const data = await User.find({}, { email: 1, _id: 0 });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${businessmail}`,
        pass: `${businessmailpass}`,
      },
    });

    //console.log(data);
    data.forEach((emails) => {
      const newsemailto = emails.email;
      var mailOptions = {
        from: `${businessmail}`,
        to: `${newsemailto}`,
        subject: 'News from Buliwear',
        text: `${req.body.description}, 
        Thank you for joining our Buliwear Family.`,
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });

    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Error' });
  }
});

userRouter.post('/buy/:id', async (req, res) => {
  const pid = req.params.id;
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: 'error', error: 'Invalid email' };
  } else {
    const product = await Product.findOne({ id: pid });
    await Bought.create({
      boughtby: req.body.email,
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

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${businessmail}`,
      pass: `${businessmailpass}`,
    },
  });

  var mailOptions = {
    from: `${businessmail}`,
    to: `${req.body.email}`,
    subject: `Order from ${req.body.name}`,
    text: `Hi ${req.body.name}, thank you for ordering our product and joining our Buliwear Family.
    Shipping Details :- 
      Name - ${req.body.name}
      Email - ${req.body.email}
      MobNum - ${req.body.mobno}
      Address - ${req.body.address}
      Product - https://fluffy-teal-giraffe.cyclic.app/productdetails/${pid}
      Thank you for Shopping with us, We will reach you as soon as possible`,
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

export default userRouter;
