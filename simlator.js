const mqtt = require('mqtt');

const random=require('random');
const  node_schedular=require('node-schedule');
const  uniqueRandomArray=require('unique-random-array');
const nestedProperty=require('nested-property');
const random_item=require('random-item');
const percent=require('percent-value');
const roundTo = require('round-to');
const getCurrentTimestamp = require('get-current-timestamp');

var fabric;
var temp;
var wash="";
let power=0;
var flag=0;
var count_2=0;
var wash_count=0;
var wash_count1=0
// var time=getCurrentTimestamp();
// console.log(time);
var stainType=uniqueRandomArray(["oil","grease","organic","muddy","ink","vinegar"]);
var stain=stainType();
var load=random.int(min = 0, max = 30);
// var load=capacity();
var energy=random.int(min = 0, max = 100);
// setTimeout(function(){ console.log("cycle count ",flag); }, 7000);
// setInterval(console.log("wash cycle"),6000);

fabric=
  [
    {
      "name":"cotton",
      "temp":80
   
    },
    {
      "name":"linen",
      "temp":35
     
    },
    {
      "name":"Denim",
      "temp":60
      
    },
    {
      "name":"Wool",
      "temp":40
    
    },
    {
      "name":"Synthetic",
      "temp":25
   
    },
    {
      "name":"beddings",
      "temp":70
      
    },
    {
      "name":"delicates",
      "temp":20
      
    },
    {
      "name":"dailywear",
      "temp":70
      
    },
    {
      "name":"babycare",
      "temp":50
      
    }
  ]
  var item = fabric[Math.floor(Math.random() * fabric.length)];
// console.log(load());
// console.log(stain());

async function addfunction(){
  process1();
}
var count_1=0;
var refill=0;
function process1(){
  refill++;
  let initialFillingCount = 0;
  const maxFillingCount = 2;
  const process = setInterval(filling, 1000);
  function filling(){
      initialFillingCount++;
      wash="fill";
      power=random.int(min=0,max=5);
      load=load++;
      
      // console.log(`draning for the ${initialFillingCount} time`)
      
      if(refill>=2){
        wash="refill";
        load=load--;
      }
      if(initialFillingCount === maxFillingCount){
          clearInterval(process);
          process2();
      }
         
  }
 
 }


function process2(){
  count_1++;
  
  let initialFillingCount = 0;
  const maxFillingCount = 2;
  const process = setInterval(filling, 1000);
  function filling(){
      initialFillingCount++;
      wash="wash";
      power=random.int(min=0,max=5);
      load=load+3;
      // console.log(`draning for the ${initialFillingCount} time`)
      if(count_1==2)
      {
        wash="rinse";
        load=load+30;
      }
      if(initialFillingCount === maxFillingCount){
          clearInterval(process);
          process3();
      }
  }
 }

 
 function process3(){
count_2++;
flag++;
  let initialFillingCount = 0;
  const maxFillingCount = 2;
  const process = setInterval(filling, 1000);
  
  function filling(){
      initialFillingCount++;
      wash="drain";
      power=random.int(min=0,max=5);
      load=load--;

       //wash cycle count
      console.log("cycle count ",flag);
    //  wash_count=flag;
var wash_count=flag;

      // console.log(`draning for the ${initialFillingCount} time`)
      if(initialFillingCount === maxFillingCount){
          clearInterval(process);
          process1();
      }
      if(count_2==2)
      {
       process4();
       
      }
     
       //wash cycle count
      // console.log("cycle count ",flag);
  }
   
 }

 function process4(){

  let initialFillingCount = 0;
  const maxFillingCount = 1;
  const process = setInterval(filling, 1000);
  function filling(){
      initialFillingCount++;
      wash="wash completed!!";
      power=random.int(min=0,max=5);
      load=load-5;
      // console.log(`draning for the ${initialFillingCount} time`)
      if(initialFillingCount === maxFillingCount){
          clearInterval(process)
      }
  }
 }

addfunction();

options={
  clientId: "DEV_WASHER_001",
  username: "DEV_XLOYLUDCHY",
  password: "7wqaskN4z31b",
  qos: 2,
  clean: true
};

const client = mqtt.connect('mqtt://dev.boodskap.io', options)

topic = '/XLOYLUDCHY/device/WASHER_001/msgs/washer/v.1.0/1220';


var i=0;
var node;

client.on('connect', () => {
 

//npm node schedule
 node=node_schedular.scheduleJob('*/1 * * * * *', function(){
   
  i++;
// if(wash==="drain"){
//   wash_count=
// }
wash_count1=percent(i).of(13)
wash_count=roundTo.down(wash_count1, 2);
console.log("wash_count",wash_count);
payload = {
  "temp":parseInt(item.temp),
  "load_size":load,
  "energy_consumption":energy,
  "cloth_type":item.name,
  "process":wash,
  "stain_type":stain,
  "power":power,
  "wash_count":wash_count
  // "started_time":getCurrentTimestamp,
  // "ended_time":getCurrentTimestamp
}
console.log("schedule count",i);
console.log("payload",payload);
client.publish(topic, JSON.stringify(payload));
if(i==13){
  node.cancel();
  }


  });
  
})