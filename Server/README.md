### Server Node.js:
Build a server with the following features:
- Connect to the Twitter API and save in a DB every time a new tweet with the word "javascript" in the body is generated.
- Expose an API so a client can get all the stored tweets. It must be possible to filter the tweets by username, hashtag
and user mention. A pagination feature is also required, giving the possibility to query 30, 50 and 100 tweets in the same
query.
- Use GitHub to store and version your code

#### To install and run:
Follow this instruction to instal proyect dependencies and run the server.

```sh
$ cd Server
$ npm install
$ npm start
```

#### Configuration:
Change this file to customize the server features.

```sh
$ cd Server
$ nano settings.json
```

This is the settings structure:
```json
{
  "twitter":{
    "consumer_key"        : "kNdnOZHq0dUiljNaWX5OrRnND",
    "consumer_secret"     : "zHSPRyMREdrPXOgF5yicLhVxKgKmaIMEYgoXvIH913TDsR4r9Q",
    "access_token_key"    : "515917811-xSTrCyPStmrouTkh8VjjbXQQO5sU54cc2BZuRghs",
    "access_token_secret" : "wSw9gLpQoSj9cYsXChJQOUvcGSJ4hKOgxBRVWNovtYKfu"
  },
  "bd":{
        "mongo" : "mongodb://dcipolat:26dd031b@ds263408.mlab.com:63408/jstweets"
  }
}
```
