const { nextISSTimesForMyLocation  } = require('./iss_promised');

// fetchMyIP()
// .then(fetchCoordsByIP )
// .then(fetchISSFlyOverTimes)
//   .then((body)=>{
//     console.log(body)
//   })

 const printPassTime = function(passTime){
  for (const pass of passTime) {
    const datetime = new Date(0);
   datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);

 }
};

  nextISSTimesForMyLocation()
    .then((passTime)=>{
      printPassTime(passTime);
    })
     .catch((error)=>{
       console.log("It didnt work", error.message);
     });

  