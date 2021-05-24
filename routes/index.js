const express = require('express'),
       router = express.Router(),
       axios  = require('axios');

const User = require('../models/userModel');

require("dotenv").config();

var url = process.env.MQ_URL;
const reqOptions = {
  headers: {
    "ibm-mq-rest-csrf-token": process.env.CSRF_TOKEN,
    "Content-Type": "text/plain;charset=utf-8",
    Authorization: process.env.MQ_AUTH
  }
};

router.get("/", function(req, res, next) {
  axios
    .delete(url, reqOptions)
    .then(async response => {
      const user = await User.findOne({email: "contact@julianash.io"})
        .catch(err => console.error(err)
      );

      res.render("index", { data: response.data, amount: user.accountBalance });
    })
    .catch(error => {
      console.log(error);
      res.render("index");
    });
});


router.post("/mq/:cost", (req, res) => {
  const cost = req.params.cost;

  const config = {
    url,
    auth: {
      username: process.env.MQ_USER,
      password: process.env.MQ_PWD
    },
    method: "post",
    ...reqOptions,
    data: cost
  };

  axios(config)
    .then(response => {
      console.log(response);
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
      res.redirect("/");
    });
});

router.post("/signup", async (req, res, next) => {
  
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    accountBalance: req.body.accountBalance,
    password: req.body.password,
    pwdConfirm: req.body.pwdConfirm
  });

  try {
    await new User(newUser).save();
  } catch (err) {
    console.error("error 🤔 " + err); 
  } finally { 
    console.log("⭐️ A brand new user has been created! 🥰"); 
  }
});

router.post('/:amount', (req, res, next) => {
  const amount = req.params.amount;

  axios.get(url, reqOptions)
    .then(async (response) => {

      const user = await User.findOne({ name: 'Julia Nash' })
        .catch(err => console.error(err));

      if (user) {
        user.accountBalance -= amount;
        await user.save();
        res.render('thanks', { 
          data: response.data,
          amount: user.accountBalance
        });
      }
    })
    .catch((error) => {
      console.log(error)
      res.render('index');
    });
});

module.exports = router;
