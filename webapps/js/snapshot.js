var consume=[];  

$(document).ready(function(){
    console.log("ready")
loadAllFunction();
  mqttConnect();
   })
   var temp;
var energy;
  function loadAllFunction(){
   // speedChart();
   // tempChart();
      loadStatusList();
 //range slider
 $(".js-range-slider").ionRangeSlider();
 
 //timeout
 $("#poweron").click(function powerOn(){
   $(this).show(function(){
     $('.alt-1').countDown({
         css_class: 'countdown-alt-1'
     });
     $("#power-icon").css('background','-webkit-linear-gradient(white,white)').css('-webkit-background-clip','text').css('-webkit-text-fill-color','transparent');
   });
 })
   
 $("#pause_btn").click(function pause(){
   $(this).hide();
   $("#play_btn").show();
 })
 $("#play_btn").click(function play(){
   $(this).hide();
   $("#pause_btn").show();
 })
  }
 
 
 function loadStatusList(){
 var queryParams1={     
      
    "aggregation":{
    "energy":{
        "terms":{
            "field":"temp"
        }
    }
}
    
   }
  var queryParams2={
             
    "aggregations": {
       "energy": {
          "terms": {
             "field": "energy_consumption"
          }
       }
    }
 }

//first ajax call
    $.ajax({
             "dataType":'json',
             "contentType": "application/json",
             "type": "POST",
             "url": BASE_PATH + "/status/list",
             "data":JSON.stringify({queryParams1}),
             success: function(data) {
     console.log(data);
//     if(data.status){
//         //  console.log(data);
//         var temp=data.result.data.data[0].temp;
//        console.log("temp",temp);
//                          tempChart();
//     }
//             
 temp=data.result.data.data[0].temp;  
 console.log(temp);
 tempChart();
                   },
                   error:function(err){
                     errorMsg("Something went wrong");
                   }
 });
// second ajax call
    $.ajax({
                 "dataType":'json',
                 "contentType": "application/json",
                 "type": "POST",
                 "url": BASE_PATH + "/history/list",
                 "data":JSON.stringify({queryParams2}),
                 success: function(data) {
         console.log("fll dta",data);
        // console.log("power1",data.result.data.data[0].power);
        var power=data.result.data.data;
      
        for(var j=0;j<=power.length-1;j++){
          
            consume.push(power[j].power);
            
        }
        console.log("consume",consume);
    //     if(data.status){
    //         //  console.log(data);
    //         var temp=data.result.data.data[0].temp;
    //        console.log("temp",temp);
    //                          tempChart();
    //     }
    //             
   
     console.log("energy",energy);
     energyChart();
                       },
                       error:function(err){
                         errorMsg("Something went wrong");
                       }
     });
 }
 //  tempChart();
     function tempChart() {

       var tempchart= echarts.init(document.getElementById('chart6'));
     option = {
     series: [{
         type: 'gauge',
         startAngle: 180,
         endAngle: 0,
         min: 0,
         max: 1,
         splitNumber: 1,
         grid:{
           top:'35%'
         },
         axisLine: {
             lineStyle: {
                 width: 6,
                 color: [
                     [0.25, '#FF6E76'],
                     [0.5, '#FDDD60'],
                     [0.75, '#58D9F9'],
                     [1, '#7CFFB2']
                 ]
             }
         },
         pointer: {
             icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
             length: '10%',
             width: 10,
             offsetCenter: [0, '-30%'],
             itemStyle: {
                 color: 'auto'
             }
         },
         axisTick: {
             length: 12,
             lineStyle: {
                 color: 'auto',
                 width: 2
             }
         },
         splitLine: {
             length: 1,
             lineStyle: {
                 color: 'auto',
                 width: 5
             }
         },
         axisLabel: {
             color: '#464646',
             fontSize: 20,
             distance: -60,
             formatter: function (value) {
                 if (value === 0.875) {
                     return '优';
                 }
                 else if (value === 0.625) {
                     return '中';
                 }
                 else if (value === 0.375) {
                     return '良';
                 }
                 else if (value === 0.125) {
                     return '差';
                 }
             }
         },
         title: {
             offsetCenter: [0, '-20%'],
             fontSize: 30
         },
         detail: {
             fontSize: 15,
             offsetCenter: [0, '0%'],
             valueAnimation: true,
             formatter: function (value) {
                 return Math.round(value * 1) + 'c';
             },
             color: 'auto'
         },
         data: [{
             value: temp,
             // name: 'hot'
            
         }]
     }]
   };
 
 tempchart.setOption(option, true);
 
     }
 
//energyChart
     function energyChart() {   
  energy=echarts.init(document.getElementById('energy'));
     option = {
     
     // grid:{
     //   backgroundColor:'red',
     //   show:true
     // },
     xAxis: {
         type: 'category',
         boundaryGap: true,
         data: ['Fill', 'Wash', 'Drain', 'Rinse', 'Finish'],
         show:true,
         splitLine:{//remove grid lines
       show:false
     },splitArea : {show : false}
     },
     yAxis: {
         type: 'value',
         show:true,
         splitLine:{//remove grid lines
       show:false
     },
                  splitArea : {show : false}// remove the grid area
 
     },
     series: [{
         data:consume,   
         type: 'line',
         areaStyle: {},
         itemStyle: {normal: {color: 'pink'}},
     }]
 };
 energy.setOption(option, true);
     }
 // ==================== mqtt  ======================================
 function mqttListen(){
   console.log("listening")
  mqttSubscribe("/XLOYLUDCHY/log/mrule/#",0);
  mqtt_client.onMessageArrived = function(message){
  var topicName = message.destinationName;
 var parsedData = JSON.parse(message.payloadString);
 if(topicName === "/XLOYLUDCHY/log/mrule/1220"){
 if(parsedData.level === 'info'){
   loadAllFunction();
 }
 }
 };
 }
 

