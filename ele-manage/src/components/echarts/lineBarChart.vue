<!--
  line-bar-chart 组件
  主要用于 折线图、柱状图展示
  主要参数 chartData：图表数据
-->
<template>
  <div class="line-chart-wrap">
    <div :id="chartId"
         class="line-chart"
         ref="lineBarChart">
    </div>
    <div class="data-null" v-if="dataNull">暂无数据</div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    props: {
      chartData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        chartId: 'chart' + this.generateUUID(),
        chart: {},
        chartOption: {},
        dataNull: false
      }
    },
    computed: {},
    methods: {
      setOption () {
        if (this.chartData && Object.keys(this.chartData).length !== 0) {
          this.chartOption = {...this.chartData};
          // 设置柱状图barMaxWidth
          if (this.chartOption.series && this.chartOption.series.length !== 0) {
            this.chartOption.series.forEach((item) => {
              if (item.type === 'bar') {
                item['barMaxWidth'] = 30;
              }
            });
          }
          // 设置图表颜色
          this.chartOption['color'] = ['#ff9800', '#009688', '#f44336', '#4caf50', '#9c27b0', '#ff5722', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#e91e63'];
        }
      },
      initChart () {
        this.chart = echarts.init(document.getElementById(this.chartId));
        this.setOption();
        this.chart.clear();
        this.chart.setOption(this.chartOption);
        this.chart.on('click', (params) => {
          this.$emit('clickChart', params);
        });
      },
      // 判断所有数据是否为null
      isDataNull () {
        let tempBoolean = true;
        if (this.chartData.series && this.chartData.series.length !== 0) {
          this.chartData.series.forEach((item) => {
            item.data.forEach((dataItem) => {
              if (dataItem) {
                tempBoolean = tempBoolean && false;
              }
            });
          });
        }
        return tempBoolean;
      }
    },
    mounted () {
      this.initChart();
      this.dataNull = this.isDataNull();
    },
    watch: {
      chartData: {
        handler () {
          this.initChart();
          this.dataNull = this.isDataNull();
        },
        deep: true
      }
    },
    components: {}
  }
</script>

<style lang="less" scoped>
  .line-chart-wrap {
    width: 100%;
    height: 600px;
    position: relative;
    .line-chart {
      height: 100%;
      width: 100%;
    }
    .data-null {
      display: flex;
      position: absolute;
      top: 40px;
      left: 40px;
      bottom: 70px;
      right: 10px;
      align-items: center;
      justify-content: center;
      color: #ddd;
    }
  }

</style>
