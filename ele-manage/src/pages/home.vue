<template>
  <div class="main-right-content-wrap">
    <line-bar-chart :chartData="chartData"></line-bar-chart>
  </div>
</template>

<script>
  import dtime from 'time-formater';
  export default {
    data () {
      return {
        chartData: {
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['bar', 'line']},
              restore: {}
            }
          },
          legend: {
            top: '5%',
            data: ['新注册用户', '新增订单', '新增管理员']
          },
          xAxis: [
            {
              data: []
            }
          ],
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '新注册用户',
              type: 'line',
              data: [],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            },
            {
              name: '新增订单',
              type: 'line',
              data: [],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            },
            {
              name: '新增管理员',
              type: 'line',
              data: [],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              }
            }
          ]
        },
        sevenDate: []
      };
    },
    methods: {
      // 获取近7天日期
      setSevenDate () {
        for (let i = 6; i > -1; i--) {
          const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD');
          this.sevenDate.push(date);
          this.chartData['xAxis'][0]['data'].push(date);
          this.getCount(date);
        }
      },
      // 获取图表数据
      getCount (date) {
        // 获取用户注册量
        this.https({url: `/statis/user/${date}/count`, method: 'get'}, (response) => {
          this.setCount(response, 0);
        });
        // 获取订单数量
        this.https({url: `/statis/order/${date}/count`, method: 'get'}, (response) => {
          this.setCount(response, 1);
        });
        // 获取管理员注册量
        this.https({url: `/statis/admin/${date}/count`, method: 'get'}, (response) => {
          this.setCount(response, 2);
        });
      },
      // 封装图表数据
      setCount (response, index) {
        if (response.status === 1) {
          this.chartData['series'][index]['data'].push(response.count);
        }
      }
    },
    mounted () {
      this.setSevenDate();
    }
  };
</script>

<style lang="less" scoped>
</style>
