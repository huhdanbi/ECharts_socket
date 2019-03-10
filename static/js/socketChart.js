var socket = io("http://localhost:3000");


function splitData(rawData) {
  var categoryData = [];
  var values = [];
  for (var i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i])
  }
  return {
      categoryData: categoryData,
      values: values
  };
}

socket.on('sendData', function(getData){
  var data = splitData(getData);
  console.log(data);
  var myChart = echarts.init(document.getElementById('main'));    
  var upColor= '#ef5350';
  var downColor = '#4985e7';

  var option = {
    title : {
      text : '타이틀',
      left : 0,
    },
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'cross'
      },
      backgroundColor: 'rgba(255, 255, 255, .95)',
      borderWidth: 1,
      borderColor: '#dedede',
      padding: 10,
      textStyle: {
          color: '#383838',
          fontSize:12,
          lineHeight:20
      }
    },
    axisPointer: {
      link: {xAxisIndex: 'all'},
      label: {
          backgroundColor: '#383838'
      }
    },
    toolbox: {
      right:15,
      feature: {
          dataZoom: {
              yAxisIndex: true
          },
          brush: {
              type: ['polygon', 'rect', 'lineX', 'lineY', 'keep', 'clear'] //오른쪽 상단 툴
          }
      }
  },
    brush: {
      xAxisIndex: 'all',
      brushLink: 'all',
      outOfBrush: {
          colorAlpha: 0.4
      }
    },
    grid : {
      width: 'auto',
      left: '4%',
      right: '6.5%',
      height: 300,
      bottom: 90,
      tooltip : {
          borderColor:'#dedede',
          axisPointer : {
            label : {
              show:true,
              fontSize:11
            }
          }
      }
    },
    xAxis : {
      type: 'category',
      data: data.categoryData,
      scale: true,
      boundaryGap : false,
      axisLine: {
        onZero: false,
        lineStyle : {
          color: '#404040' //lineColor
        }
      },
      splitLine: {
        show: true,
        lineStyle : {
          color: '#f4f4f4' //splitLineColor
        }
      },
      axisLabel : {
        fontSize : 11
      },
      splitNumber: 10,
      min: 'dataMin',
      max: 'dataMax',
    },
    yAxis: [
      {
        position: 'right',
        boundaryGap:true,
        scale: true,
        axisLine :{
          lineStyle : {
            color: '#404040' //lineColor
          }
        },
        splitArea: {
            show: false
        },  
        splitLine: {
          show: true,
          lineStyle : {
            color: '#f4f4f4' //splitLineColor
        }
      },
        axisTick : {
            alignWithLabel : true
        },
        nameTextStyle : {
          rich : {
            fontSize : 10
          }
        },
        axisLabel : {
          fontSize : 11
        }
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        // xAxisIndex: [0, 1],
        start: 90,
        end: 100
        // startValue: '2010-08-17',
        // endValue: '2012-08-06'
      },
      {
        show: true,
        // xAxisIndex: [0, 1],
        type: 'slider',
        realtime : true,
        backgroundColor : 'rgba(244,244,244,.1)',
        fillerColor :'rgba(54,76,82,.15)',
        borderColor : '#dedede',
        bottom: 15,
        dataBackground : {
          lineStyle : {
            color:'#171717'
          },
          areaStyle : {
            color: 'rgba(98,136,147,0.65)'
          }
        },
        // start: 99,
        // end: 100,
        // startValue: '2010-08-17',
        // endValue: '2012-08-06'
      }
    ],
    series: [
      {
          name: '테스트22',
          type: 'candlestick',
          data: data.values,
          itemStyle: {
              normal: {
                  color: upColor,
                  color0: downColor,
                  borderColor: null,
                  borderColor0: null
              }
          },
          markPoint: {
              label: {
                  normal: {
                      formatter: function (param) {
                          return param != null ? Math.round(param.value) : '';
                      }
                  }
              },
              data: [
                  {
                      name: 'highest value',
                      type: 'max',
                      valueDim: 'highest'
                  },
                  {
                      name: 'lowest value',
                      type: 'min',
                      valueDim: 'lowest'
                  },
                  {
                      name: 'average value on close',
                      type: 'average',
                      valueDim: 'close'
                  }
              ],
              tooltip: {
                  formatter: function (param) {
                      return param.name + '<br>' + (param.data.coord || '');
                  }
              }
          },
          markLine: {
            label : {
              componentType: 'series',
              color: '#fff',
              backgroundColor :'#d92f2f',
              padding:5,
              fontSize : 11
            },
            lineStyle : {
              color:'#d92f2f'
            },
            symbol: ['none', 'none'],
            data: [
              {
                name: 'from lowest to highest',
                type: 'max',
                valueDim: 'open',
                symbolSize: 10,
                label: {
                  normal: {show: true},
                  emphasis: {show: false}
                }
              },
                // {
                //   name: 'min line on close', 
                //   type: 'min',
                //   valueDim: 'close'
                // },
                // {
                //   name: 'max line on close',
                //   type: 'max',
                //   valueDim: 'close'
                // }
            ]
          }
      }
    ]
  }

  myChart.setOption(option);
});