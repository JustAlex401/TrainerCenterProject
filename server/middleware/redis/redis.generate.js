const redis = require("redis");

const rediscl = redis.createClient();

rediscl.on("connect", function () {
    console.log("Redis plugged in.");
});

module.exports=rediscl