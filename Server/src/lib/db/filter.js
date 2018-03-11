//Include MongoDB client.
const MongoCli  = require('mongodb').MongoClient;

//Paginate Filters.
const findPagination = (conex,query,start,end)=>{

  return new Promise((resolve,reject)=>{

    let dbo = conex.db(global.settings.bd.name);

    //Make the query.
    dbo.collection('tweets').find(query).limit(end).skip((start!=null)?start:0).toArray((err,result)=>{

      if (err)
        reject(err);
      else
        resolve(result);

    });

  });

}

//Paginate Filters.
const findNormal = (conex,query)=>{

  return new Promise((resolve,reject)=>{

    let dbo = conex.db(global.settings.bd.name);

    //Make the query.
    dbo.collection('tweets').find(query).toArray((err,result)=>{

      if (err)
        reject(err);
      else
        resolve(result);

    });

  });

}

//Create a query.
const queryFilter = (params)=>{

  let obj = {};

  //Add user filter.
  if (params.user!=null)
    obj.user = {$eq:params.user};

  //Add hashtag filter and mention user
  if ((params.hashtag!=null)||(params.mention)){

    obj.$text = {$search:""};

    if (params.hashtag!=null)
      obj.$text.$search = obj.$text.$search+params.hashtag+" ";

    if (params.mention!=null)
      obj.$text.$search = obj.$text.$search+params.mention+" ";

  }

  return obj;

}

module.exports.queryFilter     = queryFilter;
module.exports.findNormal      = findNormal;
module.exports.findPagination  = findPagination;