const redis = require("redis");

const redisPort = process.env.PORT || 6379;

const redisClient = redis.createClient(redisPort);

redisClient.on("connect", (err) =>  {
    if(err){
        console.log("Error while connecting to Redis server");
    }
    else {
        console.log("Redis Server Connected");
    }
});

module.exports = redisClient;