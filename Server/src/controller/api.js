//Include api modules.
const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('../lib/db/db.js');
const url        = require('url');

//Start expressjs
const app    = express();
const server = http.createServer(app);

//Add CORS to middleware.
const allowCrossDomain = (req, res, next)=>{

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // Intercepts OPTIONS method
  if ('OPTIONS' === req.method)      
    res.sendStatus(200);
  else
    next();

}

//On Server listen.
const onListen = ()=>{

  //Logeo arranque del server.
  console.log('Tweet JS - ApiRest');
  console.log('');  
  console.log(`* Server is running on http://${global.settings.server.ip}:${global.settings.server.port}`);

}

//On Api find routes.
const filterRoute = (req,res)=>{

  //Query params.
  let queryParams = url.parse(req.url, true).query;

  //Enable connection.
  db.connect(global.settings.bd.url).then((bdConex)=>{

    //Find tweets in the db.
    db.findTweets(bdConex,queryParams)
      .then((result) => res.status(200).json(result))
      .catch((err)   =>{
        console.log(err);
       res.status(500).json({"error":"Query error"});
    });

  }).catch((err) => res.status(500).json({"error":"Query error"}));

}

//Start api-rest
const startServer = ()=>{

  //Add bodyparser and CORS.
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(allowCrossDomain);

  //Inicio el server.
  app.listen(settings.server.port, onListen);

  //Filter route request.
  app.get('/filter/',filterRoute);

}

module.exports.start = startServer;