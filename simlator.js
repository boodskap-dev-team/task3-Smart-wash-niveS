const mqtt = require('mqtt');

const random=require('random');
const  node_schedular=require('node-schedule');
const  uniqueRandomArray=require('unique-random-array');
const nestedProperty=require('nested-property');
const random_item=require('random-item');
var fabric;
var wash="fill";
let power=0;

var stainType=uniqueRandomArray(["oil","grease","organic","muddy","ink","vinegar"]);
var stain=stainType();
var capacity=uniqueRandomArray(["min","medium","max"]);
var load=capacity();
var energy=random.int(min = 0, max = 100);
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
// console.log(load());
// console.log(stain());

async function addfunction(){
  process1();
}
var count_1=0;
function process1(){

  let initialFillingCount = 0;
  const maxFillingCount = 2;
  const process = setInterval(filling, 1000);
  function filling(){
      initialFillingCount++;
      wash="fill";
      power=random.int(min=0,max=5);
      // console.log(`draning for the ${initialFillingCount} time`)
      
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
      // console.log(`draning for the ${initialFillingCount} time`)
      if(count_1==2)
      {
        wash="rinse";
      }
      if(initialFillingCount === maxFillingCount){
          clearInterval(process);
          process3();
      }
  }
 }

 var count_2=0;
 function process3(){
count_2++;
  let initialFillingCount = 0;
  const maxFillingCount = 2;
  const process = setInterval(filling, 1000);
  function filling(){
      initialFillingCount++;
      wash="drain";
      power=random.int(min=0,max=5);
      // console.log(`draning for the ${initialFillingCount} time`)
      if(initialFillingCount === maxFillingCount){
          clearInterval(process);
      
          process1();
      }
      if(count_2==2)
      {
       process4();
      }
      
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
payload = {
  "temp":item.temp,
  "load_size":load,
  "energy_consumption":energy,
  "cloth_type":item.name,
  "process":wash,
  "stain_type":stain,
  "power":power
  // "started_time":	1612937636665,
  // "ended_time":1612937636670
}
console.log("schedule count",i);
console.log("payload",payload);
client.publish(topic, JSON.stringify(payload));
if(i==13){
  node.cancel();
  }


  });
  
})