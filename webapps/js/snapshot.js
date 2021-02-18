// const percentValue = require("percent-value");

var consume=[];  
var SmartTable=null;
var FilterTable=null;
var smart_list = [];
var filter_list = [];
var process_st;
 var temp;
var load;
var final_temp=[];
var final_load;
var energy;
var percent1;
// var status;
var filter;
var my_range;
// var dataObj;
var getvalue=[];
var percentage;
var f;

$(document).ready(function(){
console.log("ready");




loadSmartWash();
loadAllFunction();
mqttConnect();
 })

// =========================== AJAX functions with charts============================
// loadAllFunction();


function loadAllFunction(){
 loadStatusList();
 
 $('.alt-1').countDown({
             css_class: 'countdown-alt-1'
         });

 //timeout
//  $("#poweron").click(function powerOn(){
//    $(this).show(function(){
//      $('.alt-1').countDown({
//          css_class: 'countdown-alt-1'
//      });
//      $("#power-icon").css('background','-webkit-linear-gradient(white,white)').css('-webkit-background-clip','text').css('-webkit-text-fill-color','transparent');
//    });
//  })
 
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
    var queryParams1 = {
        query: {
            "bool": {
                "must": []
               
            }
        }
        // sort: [{ "created_ts": { "order": "asc" } }]
    };
    

  var queryParams2={
             
    "aggregations": {
       "energy": {
          "terms": {
             "field": "power"
          }
       }
    }
 }
 var queryParams3={
             
    "aggregations": {
       "process": {
          "terms": {
             "field": "process"
          }
       }
    }
 }
 var queryParams4={
    
        "query": {
        "bool" : {
        "must" : {
        "term" : { "cloth_type" : "cotton" }
        },
        "filter": {
        "term" : { "stain_type" : "muddy" }
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
    //  console.log(data);
            
 temp=data.result.data.data[0].temp;  
 load=data.result.data.data[0].load_size;
 percentage=data.result.data.data[0].wash_count;
//  console.log(final_temp);
 console.log("load",load);
 tempChart(temp);
 rangeslider(load);
 processChart(percentage);
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
                 "data":JSON.stringify({queryParams1}),
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
    //progress-status display
$.ajax({
                 "dataType":'json',
                 "contentType": "application/json",
                 "type": "POST",
                 "url": BASE_PATH + "/status/list",
                 "data":JSON.stringify({queryParams1}),
                 success: function(data){
        process_st=data.result.data.data[0].process;  
        console.log("progress-status",process_st);
        processStatus(process_st);
      
           // loadProcessStatus();
    }
})
//filter 
$.ajax({
                 "dataType":'json',
                 "contentType": "application/json",
                 "type": "POST",
                 "url": BASE_PATH + "/history/list",
                 "data":JSON.stringify({"query":queryParams4}),
                 success: function(data) {
         console.log("filter",data);
        // console.log("power1",data.result.data.data[0].power);
        //  filter=data.result.total;      
        // console.log("filter",filter);            
        // console.log("energy",energy);
        

     
                       },
                       error:function(err){
                         errorMsg("Something went wrong");
                       }
     });
    }

// ==================================================================
 //  tempChart() definition;
     function tempChart(dataObj) {

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
             value: dataObj,
             // name: 'hot'
            
         }]
     }]
   };
 
 tempchart.setOption(option, true);
 
     }
 //energyChart() definition
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
         data: ['Fill', 'Wash', 'Drain', 'Rinse'],
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
         itemStyle: {normal: {color: 'violet'}},
     }]
 };
 energy.setOption(option, true);
     }
//processStatus
function processStatus(Dataobj){
    if(Dataobj=="wash completed!!"){
        // $("#process-status").html(Dataobj).css('color','red');
        $("#process-status").html('<div class="blink">'+Dataobj+'</div>').css('color','blue');

        // $('#process-status').blink(100);
        // blink("#process-status",2000);
    }else{
        var newText=Dataobj.concat("ing");
        newText="Now"+" "+newText;
        $("#process-status").html(newText);
    }
  
}
//progress-chart
function processChart(dataObj){
    var status=echarts.init(document.getElementById('process-chart')); 
    console.log("tada");
    getvalue=[dataObj];

option= {
    title: {
    text: getvalue+'%',
    textStyle: {
      color: '#28BCFE',
      fontSize: 25
    },
    subtext: '',
        subtextStyle: {
            color: '#666666',
            fontSize: 30
        },
	itemGap: 20,
    left: 'center',
    top: '43%'
	},
    // tooltip: {
    //     formatter: function (params) {
    //         return '<span style="color: #fff;">综合得分：'+ getvalue + '分</span>';
    //     }
    // },
  angleAxis: {
    max: 100,
    clockwise: true, // 逆时针
    // 隐藏刻度线
    show: false
  },
  radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
            show: false,
        },
        axisLine: {
            show: false,

        },
        axisTick: {
            show: false
        },
  },
  polar: {
    center: ['50%', '50%'],
    radius: '100%' //图形大小
  },
  series: [{
    type: 'bar',
    data: getvalue,
	showBackground: true,
	backgroundStyle: {
		color: '#BDEBFF',
	},
    coordinateSystem: 'polar',
    roundCap: true,
    barWidth: 10,
    itemStyle: {
        normal: {
        opacity: 1,
        color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#25BFFF'
          }, {
            offset: 1,
            color: '#5284DE'
          }]),
        shadowBlur: 5,
        shadowColor: '#2A95F9',
    }
    },
  }]
};
// status.clear();
// console.log("hello");
status.setOption(option, true);
console.log("hello");
}


 // ==================== mqtt  ======================================
 function mqttListen() {
    mqttSubscribe("/" + DOMAIN_KEY + "/log/mrule/1220", 0);
    mqtt_client.onMessageArrived = function(message) {
        console.log("msg")
        var parsedData = JSON.parse(message.payloadString);
        if (parsedData.data.includes("_reload_")) {
            console.log("connect")
            var spited = parsedData.data.split("|")[1];

            var result = JSON.parse(spited);

             final_temp = result.temp;
            final_load = result.load_size;
            final_process = result.process;
            percent1=result.wash_count;
            rangeslider(final_load);
                tempChart(final_temp);
processStatus(final_process);
processChart(percent1);

            console.log("nai",final_load)
            console.log('final_temp--------->>>',final_temp)
            console.log('final_process--------->>>',final_process)
            console.log('final_process--------->>>',percent)

}}
}

// =================================================================================
//table
function loadSmartWash() {
    if (SmartTable) {
        SmartTable.destroy();
        $("#wash_table").html("");
    }
    var fields = [
        {
            mData: 'cloth_type',
            sTitle: 'Mode',
            sWidth: '30%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'stain_type',
            sTitle: 'Stain Type',
            sWidth: '30%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },
        {
            mData: 'process',
            sTitle: 'Process',
            sWidth: '20%',
            orderable: false,
            mRender: function (data, type, row) {
                return data;
            }
        },

        {
            mData: 'created_ts',
            sTitle: 'Started Time',
            sWidth: '30%',
            "className": 'sortingtable',
            mRender: function (data, type, row) {
                return moment(data).format(DATE_TIME_FORMAT);
            }
        }       
       
    ];

    var queryParams = {
        query: {
            "bool": {
                "must": []
               
            }
        }
        // sort: [{ "created_ts": { "order": "asc" } }]
    };

    smart_list = [];
  
   
    var tableOption = {
        fixedHeader: false,
        responsive: false,
        paging:true,
        binfo:true,
        searching: true,
        bPaginate:true,
        "pagingType":"simple",
        aaSorting: [[0, 'desc']],
        "ordering": true,
        iDisplayLength: 6,
        lengthMenu: [[10, 50, 100],[10, 50, 100]],
        aoColumns: fields,
        "bProcessing": true,
        "language": {
            "emptyTable": "No data found!",
            "processing": '<i class="fa fa-spinner fa-spin" style="color:#333"></i> Processing'

        },
        "bServerSide": true,
        "sAjaxSource": BASE_PATH+'/history/list',
        
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {


            queryParams.query['bool']['must'] = [];
            queryParams.query['bool']['should'] = [];
            delete queryParams.query['bool']["minimum_should_match"];

            // var keyName = fields[oSettings.aaSorting[0][0]]

            // var sortingJson = {};
            // sortingJson[keyName['mData']] = { "order": oSettings.aaSorting[0][1] };
            // queryParams.sort = [sortingJson];

            queryParams['size'] = oSettings._iDisplayLength;
            queryParams['from'] = oSettings._iDisplayStart;

            // queryParams.query['bool']['must'].push({ "match": { "acc_id":SESSION_OBJ.orgs[0]  } });

            var searchText = oSettings.oPreviousSearch.sSearch.trim();

            if (searchText) {
                queryParams.query['bool']['should'].push({ "wildcard": { "process": "*" + searchText + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "process": "*" + searchText.toLowerCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "process": "*" + searchText.toUpperCase() + "*" } });
                queryParams.query['bool']['should'].push({ "wildcard": { "process": "*" + capitalizeFLetter(searchText) + "*" } })
                queryParams.query['bool']["minimum_should_match"] = 1;
                queryParams.query['bool']['should'].push({
                    "match_phrase": {
                        "process.keyword": "*" + searchText + "*"
                    }
                })
                queryParams.query['bool']['should'].push({
                    "match_phrase_prefix": {
                        "process.keyword": {
                            "query": "*" + searchText + "*"
                        }
                    }
                });
            }      
            console.log("ggavcg")      
            oSettings.jqXHR = $.ajax({
                "dataType": 'json',
                "contentType": 'application/json',
                "type": "POST",
                "url": sSource,
                "data": JSON.stringify({"query":queryParams}),
                success: function (data) {
                    console.log(data);
                    var resultData = data.result.data;
                    smart_list = resultData.data;
                    console.log("hjgf",smart_list)
                    resultData['draw'] = oSettings.iDraw;
                    fnCallback(resultData);
                }
            });
        },
         
    };

    SmartTable = $("#wash_table").DataTable(tableOption);
}
//  ========================= //range slider======================================
function rangeslider(dataObj){
    console.log("load!");
   $(".js-range-slider").ionRangeSlider();
     my_range = $(".js-range-slider").data("ionRangeSlider");
    my_range.update({
        from: dataObj,
        // to: 10
    });
    
      console.log("load!!!")
}
// =========================================washing machine======================
// VARIABLES ―――――――――――――――――――――――――

const washSpeed = 600; // If changed, need to be updated in the CSS as well
const washingMachine = document.getElementById('washingMachine');
const screen = document.getElementById('controls');

const status = {
  opening: {
    isActive: true,
    statusClass: 'isOpen',
    controller: document.getElementById('opening'),
    controllerLabel: ["CLOSE", "OPEN"] },

  content: {
    isActive: true,
    statusClass: 'isFilled',
    controller: document.getElementById('content'),
    controllerLabel: ["EMPTY", "FILL"] },

  power: {
    isActive: false,
    statusClass: 'isWashing',
    controller: document.getElementById('power'),
    controllerLabel: ["STOP", "START"] } };




// PLAYGROUND ―――――――――――――――――――――――――

for (let action in status) {
  const { statusClass, controller, controllerLabel } = status[action];

  controller.addEventListener('click', function (event) {
    const { isActive } = status[action];
    washingMachine.classList.toggle(statusClass);
    this.innerHTML = controllerLabel[isActive * 1];

    if (action === "power" && !isActive) {// Slow start
      washingMachine.classList.add(statusClass);
      washingMachine.classList.add("isStarting");
      setTimeout(() => {washingMachine.classList.remove("isStarting");}, washSpeed * 2);
    }

    status[action].isActive = !isActive;

    setTimeout(function () {
      updateMachine();
    }, 100); // Timeout needed because of a bug on FF when updating innerHTML
  });
}

function updateMachine() {
  const { opening, content, power } = status;

  // Update playground

  opening.controller.disabled = power.isActive;
  content.controller.disabled = !opening.isActive;
  power.controller.disabled = opening.isActive || !content.isActive;

  // Update screen text

  if (power.isActive) {
    screen.innerHTML = "💦";
  } else if (!content.isActive) {
    screen.innerHTML = "EMPTY";
  } else if (opening.isActive) {
    screen.innerHTML = "🙃";
  } else {
    screen.innerHTML = "READY";
  }
}

