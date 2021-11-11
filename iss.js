const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json',(err,response,body)=>{
    if (err) {
      return callback(err,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip,callback) {
  request(`https://freegeoip.app/json/${ip}`,(error,response,body)=>{
    if(error){
      callback(error,null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const coordinates = JSON.parse(body);
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    callback(null,{latitude , longitude});

  })

};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url,(error,response,body)=>{
    if(error){
      callback(error,null)
    }
    if(response.statusCode !== 200){
      const msg = `Status code ${response.statusCode} when fetching ISS pass time: ${body}`;
      callback(Error(msg),null);
    }
    const passTime = JSON.parse(body);
    callback(null,passTime.response)


  })
};

const nextISSTimesForMyLocation = function(callback) {
 
      fetchMyIP((error,ip)=>{
        if(error){
          callback(error,null)
        }
        fetchCoordsByIP(ip,(error,data)=>{
          if(error){
            callback(error,null)
          }
          fetchISSFlyOverTimes(data,(error,passTime)=>{
            if(error){
              callback(error,null)
            }
            callback(null,passTime)

          })


        })


      })
    
}

module.exports = { nextISSTimesForMyLocation };
