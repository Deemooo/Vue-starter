<template>
  <div class="main-right-content-wrap">
    <pie-chart :chartData="chartData"></pie-chart>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          title: {
            text: '用户分布',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: 10,
            data: ['北京', '上海', '深圳', '杭州', '其他']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      };
    },
    methods: {
      // 获取图表数据
      getCount () {
        this.https({url: '/v1/user/city/count', method: 'get'}, (response) => {
          if (response.status === 1) {
            this.setCount(response.user_city);
          }
        });
      },
      // 封装图表数据
      setCount (response) {
        let arr = [];
        Object.keys(response).forEach((key) => {
          let item = {};
          item['value'] = response[key];
          if (key === 'beijing') {
            item['name'] = '北京';
          } else if (key === 'shanghai') {
            item['name'] = '上海';
          } else if (key === 'shenzhen') {
            item['name'] = '深圳';
          } else if (key === 'hangzhou') {
            item['name'] = '杭州';
          } else {
            item['name'] = '其他';
          }
          arr.push(item);
        });
        this.chartData['series'][0]['data'] = arr;
      }
    },
    mounted () {
      this.getCount();
    }
  };
</script>

<style lang="less" scoped>
  .main-right-content-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
