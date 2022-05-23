$(function () {
  // 监控区模块制作,立即执行函数
  (function () {
    // tab
    $('.tabs').on('click', 'a', function (e) {
      $(this).addClass('active').siblings().removeClass('active');
      // 显示对应的cotent
      $('.monitor .content')
        .eq($(this).index())
        .show()
        .siblings('.content')
        .hide();
    });

    $('.marquee-view .marquee').each(function (i, ele) {
      var rows = $(this).children().clone();
      $(this).append(rows);
    });
    //   下面写法有问题
    //   $('.marquee-view .marquee').children('.row').clone();
    //   $('.marquee-view .marquee').append($('.marquee-view .marquee .row').clone());
  })();

  // 点位分布统计模块
  (function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector('.pie'));
    // 2. 指定配置项和数据
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      // 注意颜色写的位置
      color: [
        '#006cff',
        '#60cda0',
        '#ed8884',
        '#ff9f7f',
        '#0096ff',
        '#9fe6b8',
        '#32c5e9',
        '#1d9dff',
      ],
      series: [
        {
          name: '点位统计',
          type: 'pie',
          // 如果radius是百分比则必须加引号
          radius: ['10%', '70%'],
          center: ['50%', '50%'],
          roseType: 'radius',
          data: [
            { value: 20, name: '云南' },
            { value: 26, name: '北京' },
            { value: 24, name: '山东' },
            { value: 25, name: '河北' },
            { value: 20, name: '江苏' },
            { value: 25, name: '浙江' },
            { value: 30, name: '四川' },
            { value: 42, name: '湖北' },
          ],
          // 修饰饼形图-文字-相关的样式 label对象
          label: {
            fontSize: 10,
          },
          // 修饰-引导线-样式
          labelLine: {
            // 连接到图形的线长度
            length: 6,
            // 连接到文字的线长度
            length2: 7,
          },
        },
      ],
    };

    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener('resize', function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  })();

  // 用户
  (function () {
    var myChart = echarts.init(document.querySelector('.bar'));
    var item = {
      name: '',
      value: '1200',
      // 柱子颜色
      itemStyle: {
        color: '#254065',
      },
      emphasis: {
        itemStyle: {
          color: '#254065',
        },
      },

      tooltip: {
        extraCssText: 'opacity:0',
      },
    };
    var option = {
      // 修改线性渐变色方式 1
      color: new echarts.graphic.LinearGradient(
        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
        0,
        0,
        0,
        1,
        [
          { offset: 0, color: '#00fffb' }, // 0 起始颜色
          // { offset: 0.5, color: 'yellow' }, // 0 起始颜色
          { offset: 1, color: '#0061ce' }, // 1 结束颜色
        ]
      ),
      tooltip: {
        trigger: 'item',
        // axisPointer: {
        //   type: 'shadow',
        // },
      },
      grid: {
        left: '0%',
        right: '3%',
        bottom: '3%',
        top: '3%',
        show: 'true',
        borderColor: 'rgba(0, 240, 255, 0.3)',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '上海',
            '广州',
            '北京',
            '深圳',
            '合肥',
            '',
            '......',
            '',
            '杭州',
            '厦门',
            '济南',
            '成都',
            '重庆',
          ],
          // 1、刻度设置
          axisTick: {
            alignWithLabel: false,
            // 柱子之间为刻度
            show: false,
            // 修改x轴的 刻度隐藏
          },
          // 2、刻度标签
          axisLabel: {
            //颜色
            color: '#4c9bfd',
          },
          // 3、x坐标轴颜色设置
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          // 1、刻度设置
          axisTick: {
            // alignWithLabel: false,
            // 柱子之间为刻度
            show: false,
            // 修改x轴的 刻度隐藏
          },
          // 2、刻度标签
          axisLabel: {
            //文字颜色
            color: '#4c9bfd',
          },
          // 3、y坐标轴颜色设置
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)',
            },
          },
          // y轴 分割线的样式
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)',
              // color: 'red',//测试
            },
          },
        },
      ],
      series: [
        {
          name: '用户统计',
          type: 'bar',
          barWidth: '60%',
          data: [
            2100,
            1900,
            1700,
            1560,
            1400,
            item,
            item,
            item,
            900,
            750,
            600,
            480,
            240,
          ],
        },
      ],
    };
    myChart.setOption(option);
    // // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener('resize', function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  })();

  //右侧的部分   订单量============================================
  (function () {
    $('.order .filter a').click(function () {
      index = $(this).index(); //点击时，，会顺序打乱。
      $(this).addClass('active').siblings('a').removeClass('active');

      //1、 准备数据，将数据绑定在a上面。
      // 确定索引
      // 确定当前a对应的数据

      //1、 准备数据，将数据绑定在a上面。
      var data = {
        day365: { orders: '20,301,987', amount: '99834' },
        day90: { orders: '301,987', amount: '9834' },
        day30: { orders: '1,987', amount: '3834' },
        day1: { orders: '987', amount: '834' },
      };
      // 2、⭐️确定索引号
      // console.log($(this).attr('data-key'));
      var current = data[$(this).attr('data-key')]; //对象data{}的值value day365{}
      $('.order .data h4').eq(0).text(current.orders);
      $('.order .data h4').eq(1).text(current.amount);
    });

    // 自动切换
    var index = 0;
    setInterval(function () {
      index++;
      // console.log(11);
      if (index >= 4) {
        index = 0;
      }
      $('.order .filter a').eq(index).click();
    }, 3000);
  })();

  //销售额================================================
  (function () {
    var myChart = echarts.init(document.querySelector('.line'));
    var option = {
      color: ['#00f2f1', '#ed3f35'],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['预期销售额', '实际销售额'],
        right: '10%',
        // 图例的颜色，以及位置。
        textStyle: {
          color: '#4c9bfd',
        },
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        show: true,
        borderColor: '#012f4c',
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        axisTick: 'false',
        axisLine: 'false',
        axisLabel: { color: '#4c9bfd' },
      },
      yAxis: {
        type: 'value',
        axisTick: 'false',
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            color: '#012f4a',
          },
        },
        axisLabel: { color: '#4c9bfd' },
      },
      series: [
        {
          type: 'line',
          name: '预期销售额',
          data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          smooth: true,
        },
        {
          type: 'line',
          name: '实际销售额',
          data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
          smooth: true,
        },
      ],
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });

    //换数据，option里的 series【{data:},{}】
    var data = {
      year: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      ],
      quarter: [
        [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34],
      ],
      month: [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98],
      ],
      week: [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24],
      ],
    };
    $('.sales .caption a').click(function () {
      index = $(this).index() - 1; //随意点击，，会导致自动跳顺序错乱。
      $(this).addClass('active').siblings('a').removeClass('active');
      // 自定义属性
      var current = data[$(this).attr('data-key')]; //year\quarter\ month\ week
      // console.log(current);
      option.series[0].data = current[0];
      option.series[1].data = current[1];
      // 图重绘
      myChart.setOption(option);
    });
    // 定时器切换======
    // 自动切换
    var index = 0;
    var timer = setInterval(function () {
      index++;
      // console.log(11);
      if (index >= 4) {
        index = 0;
      }
      $('.sales .caption a').eq(index).click();
    }, 3000);

    $('.sales').hover(
      function () {
        clearInterval(timer);
      },
      function () {
        clearInterval(timer);
        timer = setInterval(function () {
          index++;
          // console.log(11);
          if (index >= 4) {
            index = 0;
          }
          $('.sales .caption a').eq(index).click();
        }, 3000);
      }
    );
  })();

  // Schema:   渠道分布==================================
  (function () {
    // date,AQIindex,PM2.5,PM10,CO,NO2,SO2
    // const dataBJ = [[55, 9, 56, 0.46, 18, 6, 1]];、、
    // const dataGZ = [[26, 37, 27, 1.163, 27, 13, 1]];
    // const dataSH = [
    //   [91, 45, 125, 0.82, 34, 23, 1],
    //   [65, 27, 78, 0.86, 45, 29, 2],
    // ];
    // const lineStyle = {
    //   width: 1,
    //   opacity: 0.5,
    // };
    var myChart = echarts.init(document.querySelector('.radar'));
    var option = {
      // backgroundColor: '#161627',
      tooltip: {
        show: true,
        // 控制提示框组件的显示位置
        position: ['60%', '10%'],
      },
      radar: {
        radius: '65%',
        center: ['50%', '50%'],
        indicator: [
          { name: '机场', max: 100 },
          { name: '商场', max: 100 },
          { name: '火车站', max: 100 },
          { name: '汽车站', max: 100 },
          { name: '地铁', max: 100 },
        ],
        shape: 'circle',
        splitNumber: 4, //改为4
        // axisName: {
        //   color: 'rgb(238, 197, 102)',
        // },
        // 分割的圆圈线条的样式
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },
        splitArea: {
          show: false,
        },
        // 坐标轴的线修改为白色半透明
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },
        name: {
          // 修饰雷达图文本颜色
          textStyle: {
            color: '#4c9bfd',
          },
        },
      },
      series: [
        {
          // 填充区域的线条颜色
          lineStyle: {
            normal: {
              color: '#fff',
              width: 0.5,
              opacity: 0.5,
            },
          },
          name: '北京',
          type: 'radar',
          areaStyle: {
            color: 'rgba(238, 197, 102, 0.6)',
          },
          lineStyle: {},
          data: [[90, 19, 56, 11, 34]],
          // symbol 标记的样式(拐点），还可以取值'rect' 方块 ,'arrow' 三角等
          symbol: 'circle',
          // 拐点的大小
          symbolSize: 5,
          // // 小圆点（拐点）设置为白色
          itemStyle: {
            color: '#fff',
          },
          // 让小圆点显示数据
          label: {
            // color: '#fff',
            fontSize: 10,
            show: true,
          },
          // 修饰我们区域填充的背景颜色
          areaStyle: {
            color: 'rgba(238, 197, 102, 0.6)',
          },
        },
      ],
    };

    myChart.setOption(option);

    window.addEventListener('resize', function () {
      myChart.resize();
    });
  })();

  // 一季度销售进度====================================
  (function () {
    var myChart = echarts.init(document.querySelector('.gauge'));
    var option = {
      // tooltip: {
      //   trigger: 'item',
      // },
      // legend: {
      //   top: '5%',
      //   left: 'center',
      // },
      series: [
        {
          hoverOffset: 0,
          startAngle: 0,
          name: 'Access From',
          type: 'pie',
          radius: ['130%', '150%'],
          center: ['48%', '80%'],
          avoidLabelOverlap: false,
          // 高亮偏移

          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: 1000,
              name: 'Search Engine',
              itemStyle: {
                color: 'transparent',
              },
            },
            {
              value: 500,
              name: 'Direct',
              itemStyle: {
                // 颜色渐变#00c9e0->#005fc1
                color: new echarts.graphic.LinearGradient(
                  // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: '#00c9e0' }, // 0 起始颜色
                    { offset: 1, color: '#005fc1' }, // 1 结束颜色
                  ]
                ),
              },
            },
            {
              value: 500,
              name: 'Email',
              itemStyle: {
                color: '#12274d',
              },
            },
          ],
        },
      ],
    };

    myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  })();

  //
  (function () {
    // 添加各省的热销数据
    var hotData = [
      {
        city: '北京', // 城市
        sales: '25, 179', // 销售额
        flag: true, //  上升还是下降
        brands: [
          //  品牌种类数据
          { name: '可爱多', num: '9,086', flag: true },
          { name: '娃哈哈', num: '8,341', flag: true },
          { name: '喜之郎', num: '7,407', flag: false },
          { name: '八喜', num: '6,080', flag: false },
          { name: '小洋人', num: '6,724', flag: false },
          { name: '好多鱼', num: '2,170', flag: true },
        ],
      },
      {
        city: '河北',
        sales: '23,252',
        flag: false,
        brands: [
          { name: '可爱多', num: '3,457', flag: false },
          { name: '娃哈哈', num: '2,124', flag: true },
          { name: '喜之郎', num: '8,907', flag: false },
          { name: '八喜', num: '6,080', flag: true },
          { name: '小洋人', num: '1,724', flag: false },
          { name: '好多鱼', num: '1,170', flag: false },
        ],
      },
      {
        city: '上海',
        sales: '20,760',
        flag: true,
        brands: [
          { name: '可爱多', num: '2,345', flag: true },
          { name: '娃哈哈', num: '7,109', flag: true },
          { name: '喜之郎', num: '3,701', flag: false },
          { name: '八喜', num: '6,080', flag: false },
          { name: '小洋人', num: '2,724', flag: false },
          { name: '好多鱼', num: '2,998', flag: true },
        ],
      },
      {
        city: '江苏',
        sales: '23,252',
        flag: false,
        brands: [
          { name: '可爱多', num: '2,156', flag: false },
          { name: '娃哈哈', num: '2,456', flag: true },
          { name: '喜之郎', num: '9,737', flag: true },
          { name: '八喜', num: '2,080', flag: true },
          { name: '小洋人', num: '8,724', flag: true },
          { name: '好多鱼', num: '1,770', flag: false },
        ],
      },
      {
        city: '山东',
        sales: '20,760',
        flag: true,
        brands: [
          { name: '可爱多', num: '9,567', flag: true },
          { name: '娃哈哈', num: '2,345', flag: false },
          { name: '喜之郎', num: '9,037', flag: false },
          { name: '八喜', num: '1,080', flag: true },
          { name: '小洋人', num: '4,724', flag: false },
          { name: '好多鱼', num: '9,999', flag: true },
        ],
      },
    ];
    // 一、
    var str = '';
    $.each(hotData, function (index, ele) {
      str =
        str +
        `<li>
      <span>${ele.city}</span>
      <span>
      ${ele.sales} <s class="${ele.flag ? 'icon-up' : 'icon-down'}"></s>
      </span>
    </li>`;
    });
    $('.province .sup').html(str);
    // 二、近30日的，鼠标进入
    $('.province .sup li').mouseenter(function () {
      index = $(this).index(); //鼠标经过，，会顺序打乱，，去掉var，index与全局的index保持一致。
      // console.log(hotData[index]); //hotData的元素
      var str = '';
      // 遍历brands
      $.each(hotData[index].brands, function (index, ele) {
        str =
          str +
          `<li><span>${ele.name}</span>
          <span> ${ele.num}<s class="${
            ele.flag ? 'icon-up' : 'icon-down'
          }"></s></span></li>`;
      });
      $('.province .sub').html(str);
      $(this).addClass('active').siblings('li').removeClass('active');
    });

    // 1、默认情况下显示第一条数据
    $('.province .sup li').eq(0).mouseenter();
    // 2、自动隔2秒调用代码
    var index = 0;
    var timer = setInterval(function () {
      index++;
      if (index >= 5) {
        index = 0;
      }
      // $('.province .sup li').eq(index).mouseenter();
      render($('.province .sup li').eq(index)); //================
    }, 2000);

    //3、 鼠标hover事件
    $('.province .sup').hover(
      function () {
        clearInterval(timer); //清除定时器
      },
      function () {
        clearInterval(timer); //清除定时器
        // 调用定时器
        timer = setInterval(function () {
          index++;
          if (index >= 5) {
            index = 0;
          }
          // $('.province .sup li').eq(index).mouseenter();
          render($('.province .sup li').eq(index)); //================
        }, 2000);
      }
    );
    // 4、封装鼠标进入的代码。
    function render(currentLi) {
      var str = '';
      $.each(hotData[currentLi.index()].brands, function (index, ele) {
        str =
          str +
          `<li><span>${ele.name}</span>
          <span> ${ele.num}<s class="${
            ele.flag ? 'icon-up' : 'icon-down'
          }"></s></span></li>`;
      });
      $('.province .sub').html(str);
      currentLi.addClass('active').siblings('li').removeClass('active');
    }
  })();

  // 中国地图
  (function () {
    var myChart = echarts.init(document.querySelector('.geo'));
    var geoCoordMap = {
      上海: [121.4648, 31.2891],
      东莞: [113.8953, 22.901],
      东营: [118.7073, 37.5513],
      中山: [113.4229, 22.478],
      临汾: [111.4783, 36.1615],
      临沂: [118.3118, 35.2936],
      丹东: [124.541, 40.4242],
      丽水: [119.5642, 28.1854],
      乌鲁木齐: [87.9236, 43.5883],
      佛山: [112.8955, 23.1097],
      保定: [115.0488, 39.0948],
      兰州: [103.5901, 36.3043],
      包头: [110.3467, 41.4899],
      北京: [116.4551, 40.2539],
      北海: [109.314, 21.6211],
      南京: [118.8062, 31.9208],
      南宁: [108.479, 23.1152],
      南昌: [116.0046, 28.6633],
      南通: [121.1023, 32.1625],
      厦门: [118.1689, 24.6478],
      台州: [121.1353, 28.6688],
      合肥: [117.29, 32.0581],
      呼和浩特: [111.4124, 40.4901],
      咸阳: [108.4131, 34.8706],
      哈尔滨: [127.9688, 45.368],
      唐山: [118.4766, 39.6826],
      嘉兴: [120.9155, 30.6354],
      大同: [113.7854, 39.8035],
      大连: [122.2229, 39.4409],
      天津: [117.4219, 39.4189],
      太原: [112.3352, 37.9413],
      威海: [121.9482, 37.1393],
      宁波: [121.5967, 29.6466],
      宝鸡: [107.1826, 34.3433],
      宿迁: [118.5535, 33.7775],
      常州: [119.4543, 31.5582],
      广州: [113.5107, 23.2196],
      廊坊: [116.521, 39.0509],
      延安: [109.1052, 36.4252],
      张家口: [115.1477, 40.8527],
      徐州: [117.5208, 34.3268],
      德州: [116.6858, 37.2107],
      惠州: [114.6204, 23.1647],
      成都: [103.9526, 30.7617],
      扬州: [119.4653, 32.8162],
      承德: [117.5757, 41.4075],
      拉萨: [91.1865, 30.1465],
      无锡: [120.3442, 31.5527],
      日照: [119.2786, 35.5023],
      昆明: [102.9199, 25.4663],
      杭州: [119.5313, 29.8773],
      枣庄: [117.323, 34.8926],
      柳州: [109.3799, 24.9774],
      株洲: [113.5327, 27.0319],
      武汉: [114.3896, 30.6628],
      汕头: [117.1692, 23.3405],
      江门: [112.6318, 22.1484],
      沈阳: [123.1238, 42.1216],
      沧州: [116.8286, 38.2104],
      河源: [114.917, 23.9722],
      泉州: [118.3228, 25.1147],
      泰安: [117.0264, 36.0516],
      泰州: [120.0586, 32.5525],
      济南: [117.1582, 36.8701],
      济宁: [116.8286, 35.3375],
      海口: [110.3893, 19.8516],
      淄博: [118.0371, 36.6064],
      淮安: [118.927, 33.4039],
      深圳: [114.5435, 22.5439],
      清远: [112.9175, 24.3292],
      温州: [120.498, 27.8119],
      渭南: [109.7864, 35.0299],
      湖州: [119.8608, 30.7782],
      湘潭: [112.5439, 27.7075],
      滨州: [117.8174, 37.4963],
      潍坊: [119.0918, 36.524],
      烟台: [120.7397, 37.5128],
      玉溪: [101.9312, 23.8898],
      珠海: [113.7305, 22.1155],
      盐城: [120.2234, 33.5577],
      盘锦: [121.9482, 41.0449],
      石家庄: [114.4995, 38.1006],
      福州: [119.4543, 25.9222],
      秦皇岛: [119.2126, 40.0232],
      绍兴: [120.564, 29.7565],
      聊城: [115.9167, 36.4032],
      肇庆: [112.1265, 23.5822],
      舟山: [122.2559, 30.2234],
      苏州: [120.6519, 31.3989],
      莱芜: [117.6526, 36.2714],
      菏泽: [115.6201, 35.2057],
      营口: [122.4316, 40.4297],
      葫芦岛: [120.1575, 40.578],
      衡水: [115.8838, 37.7161],
      衢州: [118.6853, 28.8666],
      西宁: [101.4038, 36.8207],
      西安: [109.1162, 34.2004],
      贵阳: [106.6992, 26.7682],
      连云港: [119.1248, 34.552],
      邢台: [114.8071, 37.2821],
      邯郸: [114.4775, 36.535],
      郑州: [113.4668, 34.6234],
      鄂尔多斯: [108.9734, 39.2487],
      重庆: [107.7539, 30.1904],
      金华: [120.0037, 29.1028],
      铜川: [109.0393, 35.1947],
      银川: [106.3586, 38.1775],
      镇江: [119.4763, 31.9702],
      长春: [125.8154, 44.2584],
      长沙: [113.0823, 28.2568],
      长治: [112.8625, 36.4746],
      阳泉: [113.4778, 38.0951],
      青岛: [120.4651, 36.3373],
      韶关: [113.7964, 24.7028],
    };
    var XAData = [
      [{ name: '西安' }, { name: '拉萨', value: 100 }],
      [{ name: '西安' }, { name: '上海', value: 100 }],
      [{ name: '西安' }, { name: '广州', value: 100 }],
      [{ name: '西安' }, { name: '西宁', value: 100 }],
      [{ name: '西安' }, { name: '银川', value: 100 }],
    ];

    var XNData = [
      [{ name: '西宁' }, { name: '北京', value: 100 }],
      [{ name: '西宁' }, { name: '上海', value: 100 }],
      [{ name: '西宁' }, { name: '广州', value: 100 }],
      [{ name: '西宁' }, { name: '西安', value: 100 }],
      [{ name: '西宁' }, { name: '银川', value: 100 }],
    ];

    var YCData = [
      [{ name: '拉萨' }, { name: '潍坊', value: 100 }],
      [{ name: '拉萨' }, { name: '哈尔滨', value: 100 }],
      [{ name: '银川' }, { name: '上海', value: 100 }],
      [{ name: '银川' }, { name: '西安', value: 100 }],
      [{ name: '银川' }, { name: '西宁', value: 100 }],
    ];
    var planePath =
      'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];

        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value,
          });
        }
      }
      return res;
    };
    var color = ['#a6c84c', '#ffa022', '#46bee9']; //航线的颜色
    var series = [];
    [
      ['西安', XAData],
      ['西宁', XNData],
      ['银川', YCData],
    ].forEach(function (item, i) {
      series.push(
        {
          name: item[0] + ' Top3',
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: 'red', //arrow箭头的颜色
            symbolSize: 3,
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2,
            },
          },
          data: convertData(item[1]),
        },
        {
          name: item[0] + ' Top3',
          type: 'lines',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15,
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2,
            },
          },
          data: convertData(item[1]),
        },
        {
          name: item[0] + ' Top3',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke',
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}',
            },
          },
          symbolSize: function (val) {
            return val[2] / 8;
          },
          itemStyle: {
            normal: {
              color: color[i],
            },
            emphasis: {
              areaColor: '#2B91B7',
            },
          },
          data: item[1].map(function (dataItem) {
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
            };
          }),
        }
      );
    });
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params, ticket, callback) {
          if (params.seriesType == 'effectScatter') {
            return '线路：' + params.data.name + '' + params.data.value[2];
          } else if (params.seriesType == 'lines') {
            return (
              params.data.fromName +
              '>' +
              params.data.toName +
              '<br />' +
              params.data.value
            );
          } else {
            return params.name;
          }
        },
      },
      // 图例
      // legend: {
      //   orient: 'vertical',
      //   top: 'bottom',
      //   left: 'right',
      //   data: ['西安 Top3', '西宁 Top3', '银川 Top3'],
      //   textStyle: {
      //     color: '#fff',
      //   },
      //   selectedMode: 'multiple',
      // },
      geo: {
        map: 'china',
        label: {
          emphasis: {
            show: true,
            color: '#fff',
          },
        },
        // 把中国地图放大了1.2倍
        zoom: 1.2,
        roam: true,
        itemStyle: {
          normal: {
            // 地图省份的背景颜色
            areaColor: '#142957',
            borderColor: '#0692a4',
            borderWidth: 1,
          },
          emphasis: {
            areaColor: '#0b1c2d',
          },
        },
      },
      series: series,
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    });
  })();
});
