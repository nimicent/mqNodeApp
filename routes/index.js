const express = require('express'),
       router = express.Router(),
       axios  = require('axios');

require('dotenv').config()

const url = process.env.MQ_URL;

const reqOptions = {
    headers: {
        'ibm-mq-rest-csrf-token': process.env.CSRF_TOKEN, 
        'Content-Type': 'text/plain;charset=utf-8', 
        'Authorization': process.env.MQ_AUTH
    }
}

router.get('/', function(req, res, next) {
    axios.delete(url, reqOptions)
    .then((response) => {
      res.render('index', { data: response.data });
    })
    .catch((error) => {
      console.log(error)
      res.render('index');
    });

});

router.post('/mq/:cost', (req, res) => {

  const cost = req.params.cost;

  const config = {
    url,
    auth: {
      username: process.env.MQ_USER,
      password: process.env.MQ_PWD
    },
    method: 'post',
    ...reqOptions,
    data: cost,
  }

  axios(config)
    .then((response) => {
      console.log(response)
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error)
      res.redirect('/');
    });
})  

module.exports = router;
