const redis = require('redis');
// const client = redis.createClient();

// client.on('error', function(err){
//   console.log('Something went wrong ', err)
// });


module.exports = (function(){
  const client = new redis.createClient(  
    process.env.REDIS_PORT || 6379,
    process.env.REDIS_HOST || 'localhost'
  );
  
  return {
    client
  };
}());


