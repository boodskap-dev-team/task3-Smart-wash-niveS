const mqtt = require('mqtt');

const random=require('random');
const  node_schedular=require('node-schedule');
const  uniqueRandomArray=require('unique-random-array');
const nestedProperty=require('nested-property');
const random_item=require('random-item');
var fabric;


var stain=uniqueRandomArray(["oil","grease","organic","muddy","ink","vinegar"]);
var load=uniqueRandomArray(["min","medium","max"]);
var energy=random.int(min = 0, max = 100);

console.log(load());

console.log(stain());

if(energy<=30){
var result="low_consume"
console.log(result);
}
else if((energy>30)&&(energy<=70)){
   var result="medium_consume";
  console.log(result);
}
else{
  var result="high_consume";
  console.log(result);
}



options={
  clientId: "DEV_WASHER_001",
  username: "DEV_XLOYLUDCHY",
  password: "7wqaskN4z31b",
  qos: 2,
  clean: true
};

const client = mqtt.connect('mqtt://dev.boodskap.io', options)

topic = '/XLOYLUDCHY/device/WASHER_001/msgs/washer/v.1.0/1220';




client.on('connect', () => {
 

//npm node schedule
 node_schedular.scheduleJob('*/10 * * * * *', function(){
   
  fabric=
  [
    {
      "name":"cotton",
      "temp":30
   
    },
    {
      "name":"linen",
      "temp":25
     
    },
    {
      "name":"Denim",
      "temp":40
      
    },
    {
      "name":"Wool",
      "temp":32
    
    },
    {
      "name":"Synthetic",
      "temp":38
   
    },
    {
      "name":"beddings",
      "temp":42
      
    }
  ]
  var item = fabric[Math.floor(Math.random() * fabric.length)];

payload = {
  "temp":item.temp,
  "load_size":load(),
  "energy_consumption":random.int(min = 0, max = 100),
  "cloth_type":item.name,
  "process":"drain",
  "stain_type":stain(),
  "started_time":	1612937636665,
  "ended_time":1612937636670
}
console.log("payload",payload);
client.publish(topic, JSON.stringify(payload));
  });
})