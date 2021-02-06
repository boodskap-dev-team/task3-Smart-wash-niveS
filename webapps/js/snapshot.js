
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


