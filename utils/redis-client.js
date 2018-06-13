const redis = require('redis');
// const client = redis.createClient();

// client.on('error', function(err){
//   console.log('Something went wrong ', err)
// });


module.exports = (function(){
  const client = new redis.createClient();
  return {
    client
  };
}());


