//Include modules.
const config     = require('./utils/config.js');
const constants  = require('./utils/constants.js');

//Include tweet scan and api-rest module.
const tweetScan  = require('./controller/tweet_scan.js');
const api        = require('./controller/api.js');

//Load settings.
global.settings  = config.getConfig(constants.settings_path);

//Start a twitter tracking.
tweetScan.track('javascript');

//Active Api-rest server.
api.start();