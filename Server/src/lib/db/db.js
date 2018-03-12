//Include MongoDB client.
const MongoCli  = require('mongodb').MongoClient;
const filter    = require('./filter.js');

//Enable connection.
const connect = (dbUrl)=>{

  return new Promise((resolve,reject)=>{

    try{

      //Try to connect to mongodb.
      MongoCli.connect(dbUrl, (err, conex)=>{

        if (err)
          reject(err);
        else
          resolve(conex);

      });

    } catch(error){

      reject(err);

    }

  });

}

//Save a tweet in the bd.
const saveTweet = (bdConex,tweet)=>{

  return new Promise((resolve,reject)=>{

    //Select db.
    let dbo = bdConex.db(global.settings.bd.name);

    //Insert the tweet.
    dbo.collection("tweets").insertOne(tweet, function(err, res) {

      if (err)
        reject(err);
      else
        resolve(true);

    });

  });

}

//Find tweets
const findTweets = (bdConex,params)=>{

  //Make the query.
  let query = filter.queryFilter(params);  

  //If a paginated request.
  if ((params.to!=null)||(params.limit!=null))
    return filter.findPagination(bdConex,query,parseInt(params.to),parseInt(params.limit));
  else
    return filter.findNormal(bdConex,query);

}

module.exports.connect    = connect;
module.exports.saveTweet  = saveTweet;
module.exports.findTweets = findTweets;