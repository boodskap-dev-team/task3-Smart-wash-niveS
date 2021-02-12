
console.log("bavan");


$(document).ready(function() {
    console.log( "ready!" );
  
});
// function speedChart() {
//     var speedchart= echarts.init(document.getElementById('chart6'));
//     option = {
//     series: [{
//         type: 'gauge',
//         startAngle: 180,
//         endAngle: 0,
//         min: 0,
//         max: 1,
//         splitNumber: 1,
//         grid:{
//           top:'35%'
//         },
//         axisLine: {
//             lineStyle: {
//                 width: 6,
//                 color: [
//                     [0.25, '#FF6E76'],
//                     [0.5, '#FDDD60'],
//                     [0.75, '#58D9F9'],
//                     [1, '#7CFFB2']
//                 ]
//             }
//         },
//         pointer: {
//             icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
//             length: '10%',
//             width: 10,
//             offsetCenter: [0, '-30%'],
//             itemStyle: {
//                 color: 'auto'
//             }
//         },
//         axisTick: {
//             length: 12,
//             lineStyle: {
//                 color: 'auto',
//                 width: 2
//             }
//         },
//         splitLine: {
//             length: 1,
//             lineStyle: {
//                 color: 'auto',
//                 width: 5
//             }
//         },
//         axisLabel: {
//             color: '#464646',
//             fontSize: 20,
//             distance: -60,
//             formatter: function (value) {
//                 if (value === 0.875) {
//                     return '优';
//                 }
//                 else if (value === 0.625) {
//                     return '中';
//                 }
//                 else if (value === 0.375) {
//                     return '良';
//                 }
//                 else if (value === 0.125) {
//                     return '差';
//                 }
//             }
//         },
//         title: {
//             offsetCenter: [0, '-20%'],
//             fontSize: 30
//         },
//         detail: {
//             fontSize: 15,
//             offsetCenter: [0, '0%'],
//             valueAnimation: true,
//             formatter: function (value) {
//                 return Math.round(value * 100) + 'c';
//             },
//             color: 'auto'
//         },
//         data: [{
//             value: 0.30,
//             // name: 'hot'
           
//         }]
//     }]
//   };

// speedchart.setOption(option, true);
//     }


    



// // $(document).ready(function () {
// //     alert('hhh')
// //     $('.alt-1').countDown({
// //         css_class: 'countdown-alt-1'
// //     });
// // })

// $(document).ready(function () {
// speedChart();});


// function speedChart() {
//     var speedchart= echarts.init(document.getElementById('chart1'));
// option = {
//     series: [{
//         type: 'gauge',
//         axisLine: {
//             lineStyle: {
//                 width: 30,
//                 color: [
//                     [0.3, '#67e0e3'],
//                     [0.7, '#37a2da'],
//                     [1, '#fd666d']
//                 ]
//             }
//         },
//         pointer: {
//             itemStyle: {
//                 color: 'auto'
//             }
//         },
//         axisTick: {
//             distance: -30,
//             length: 8,
//             lineStyle: {
//                 color: '#fff',
//                 width: 2
//             }
//         },
//         splitLine: {
//             distance: -30,
//             length: 30,
//             lineStyle: {
//                 color: '#fff',
//                 width: 4
//             }
//         },
//         axisLabel: {
//             color: 'auto',
//             distance: 40,
//             fontSize: 20
//         },
//         detail: {
//             valueAnimation: true,
//             formatter: '{value} km/h',
//             color: 'auto'
//         },
//         data: [{
//             value: 70
//         }]
//     }]
// };

// setInterval(function () {
//     option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
//     speedchart.setOption(option, true);
// }, 2000);


