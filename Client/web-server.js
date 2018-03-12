//Include modules.
const fs         = require('fs');
const path       = require('path');
const express    = require('express');
const bodyParser = require('body-parser');

//Start expressjs.
const app = express();

//Define configuration file.
const fileConfig = './web-server.json';

//Seteo la config. en una variable glogal.
global.settings  = JSON.parse(fs.readFileSync(fileConfig).toString());

//Defino el path de donde traer archivos estaticos.
app.use(express.static(path.join(__dirname, settings.www), {
  dotfiles: 'ignore',
  index: false
}));

//Configure parser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Add CORS.
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); 
  next();
});

//Always return base file.
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, global.settings.base));
});

//File not found
app.use((req, res, next) => {  
  let err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Server Error.
app.use((err, req, res, next) => {
  res.sendStatus(err.status || 500);
});

//Start server.
app.listen(settings.port,() => {
  console.log(`* Static Web server, running in  http://${global.settings.ip}:${global.settings.port}`);
  console.log('');
});