//Include modules.
const TwitterEvents = require('../lib/twitterEvents.js');
const db            = require('../lib/db/db.js');

//Create a single tweet structure.
const tweetObj   = (tweet)=>{

  return {"date" : tweet.created_at,
          "id"   : tweet.id,
          "text" : tweet.text,
          "user" : tweet.user.name};

}

//Enable a tweet track process.
const scannTweets = (tweetWord)=>{

  //Create twitter streaming object.
  const tweetEvents = new TwitterEvents();

  //Enable connection.
  db.connect(global.settings.bd.url).then((bdConex)=>{

    console.log('> Mongodb connection ok!');
    console.log('> Waiting for new tweets:',tweetWord,'\n');    

    //Inicio revision de tweets.
    tweetEvents.trackWord(tweetWord,()=>{

      console.log('> Tracking Twitter word...\n');

    });

    //Cuando recibo un tweet de JS.
    tweetEvents.on('onTweet',(tweet)=>{

      console.log('OK> Received tweet from:',tweet.user.name,'\nOK> Text:',tweet.text);

      //Store a tweet in bd.
      db.saveTweet(bdConex,tweetObj(tweet))
        .then((ok)   => console.log('OK> New tweet saved.\n'))
        .catch((err) => console.log("ERROR> could'nt save a tweet",err));

    });

    //Cuando el tracker recibe un error.
    tweetEvents.on('onError',(error)=>{
      
      console.log('ERROR> Received error in twitter tracker',error);

    });

  }).catch((err)=>{

    console.log("ERROR> Could'nt connect to database 11",err);

  });

}

module.exports.track = scannTweets;