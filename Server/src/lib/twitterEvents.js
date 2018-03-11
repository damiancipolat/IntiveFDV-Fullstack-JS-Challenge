//Include modules.
const Twitter      = require('Twitter');
const EventEmitter = require('events');

//A class that extends front event emitter module
//to control the tweets from the streaming.
class TwitterEvents extends EventEmitter {

  constructor(){

    super();

    //Store configurations.
    this.configApi = global.settings;

    //Create twitter instance.
    this.client    =  new Twitter({
        consumer_key        : this.configApi.consumer_key,
        consumer_secret     : this.configApi.consumer_secret,
        access_token_key    : this.configApi.access_token_key,
        access_token_secret : this.configApi.access_token_secret
    });

    //Stream buffer.
    this.stream = null;    

  }

  //Start streaming by the parameter word.
  trackWord(word){

    //Create instance to streaming api.
    this.stream = this.client.stream('statuses/filter', {track: word});

    //When receive a tweet.
    this.stream.on('data', (event)  => this.emit('onTweet',event));

    //When produce an error. 
    this.stream.on('error', (error) => this.emit('onError',error));

  }

}

module.exports = TwitterEvents;