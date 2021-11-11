
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

/*
// fetchMyIP((error,ip)=>{
//   if(error){
//     console.log("It didn't work" , error);
//     return;
//   }
//   console.log("IP address is" , ip)
// })
// fetchCoordsByIP('76.68.24.31',(error,data)=>{
//   if(error){
//     console.log("Error in fetching geo-cordinates is",error);
//     return;
//   }
 
//   console.log("Cordinates are :", data)
// })

// const coordinates = {latitude : 43.7806   ,
//                       longitude: -79.3503 }
// fetchISSFlyOverTimes(coordinates ,(error,data)=>{
//   if(error){
//     console.log("It didn't work" , error);
//     return;
//   }
//   console.log("Flyover time are:",data)


// })  */

nextISSTimesForMyLocation((error,passTime)=>{
  if(error){
    console.log("It didn't work:",error);
    return;
  }
  for (const pass of passTime) {
    const datetime = new Date(0);
   datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  
   }

})