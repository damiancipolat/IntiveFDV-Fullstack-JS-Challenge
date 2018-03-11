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
const saveTweet = (db,tweet)=>{

  return new Promise((resolve,reject)=>{

    //Select db.
    let dbo = db.db(global.settings.db.name);

    //Insert the tweet.
    dbo.collection("tweets").insertOne(myobj, function(err, res) {

      if (err)
        reject(err);
      else
        resolve(true);

    });

  });

}

//Find tweets
const findTweets = (conex,params)=>{

  //Make the query.
  let query = filter.queryFilter(params);  

  //console.log('>scan',query);

  //If a paginated request.
  if ((params.to!=null)||(params.limit!=null))
    return filter.findPagination(conex,query,parseInt(params.to),parseInt(params.limit));
  else
    return filter.findNormal(conex,query);
}

module.exports.connect    = connect;
module.exports.saveTweet  = saveTweet;
module.exports.findTweets = findTweets;