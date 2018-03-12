### Server Node.js:

#### Instructions:
Build a server with the following features:
- Connect to the Twitter API and save in a DB every time a new tweet with the word "javascript" in the body is generated.
- Expose an API so a client can get all the stored tweets. It must be possible to filter the tweets by username, hashtag
and user mention. A pagination feature is also required, giving the possibility to query 30, 50 and 100 tweets in the same
query.
- Use GitHub to store and version your code

#### Development details:
To create this project I use the "tweet" module of npm to consume the Twitter streaming API, also use the ExpressJS framework to create the api rest. As a database I use MongoDB.

The MongoDB server is Database as a Service in Mongo Lab https://mlab.com/.

#### To install and run:
Follow this instruction to instal the proyect dependencies and run the server.

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

This is the settings file structure:
```json
{
  "twitter":{
    "consumer_key"        : "...",
    "consumer_secret"     : "...",
    "access_token_key"    : "...",
    "access_token_secret" : "..."
  },
  "bd":{
      "url"  : "...",
      "name" : "..."
  },
  "server":{
    "ip"   : "127.0.0.1",
    "port" : 8000
  }
}
```

##### To test the API-REST:
Make a GET request at this endpoinst.


| Function  | URL      |
|------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Filter by username                                         | http://127.0.0.1:8000/filter?user=damcipolat                                          |
| Filter by username with pagination                         | http://127.0.0.1:8000/filter?to=10&limit=40&user=damcipolat                           |
| Filter by username and hashtag with pagination             | http://127.0.0.1:8000/filter?to=10&limit=40&user=damcipolat&hashtag=css               |
| Filter by username and hashtah and mention with pagination | http://127.0.0.1:8000/filter?to=10&limit=40&user=damcipolat&hashtag=css&mention=peter |
