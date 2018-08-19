<template>
  <div class="main-right-content-wrap">
    <data-table
      :columns="tableColumns"
      :data="tableData"
      :loading="tableLoading"
      :total="tableTotal"
      :current="pageIndex"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
      ref="pnsTable">
    </data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableColumns: [
          {type: 'expand',
            align: 'center',
            width: 50,
            render: (h, params) => {
              return h('div', [
                h('span', params.row.id),
                h('span', params.row.phone)
              ])
            }
          },
          {key: 'name', title: '店铺名称', align: 'center', minWidth: 100},
          {key: 'address', title: '店铺地址', align: 'center', minWidth: 100},
          {key: 'description', title: '店铺介绍', align: 'center', minWidth: 100}
        ],
        tableData: [],
        tableLoading: false,
        pageIndex: 0,
        pageSize: 20,
        tableTotal: 0,
        city: {}
      };
    },
    methods: {
      // 获取表格数据
      getTableData () {
        let {latitude, longitude} = this.city;
        let params = this.setStrOfUrl({
          latitude,
          longitude,
          offset: this.pageIndex,
          limit: this.pageSize
        });
        this.https({url: '/shopping/restaurants?' + params, method: 'get'}, (response) => {
          if (response) {
            this.getTableDataTotal();
            this.setTableData(response);
          }
        });
      },
      // 获取总数
      getTableDataTotal () {
        this.https({url: '/shopping/restaurants/count', method: 'get'}, (response) => {
          if (response.status === 1) {
            this.tableTotal = response.count;
          }
        });
      },
      // 获取定位城市
      getCityInfo () {
        this.https({url: '/v1/cities?type=guess', method: 'get'}, (response) => {
          if (response) {
            this.city = response;
            this.getTableData();
          }
        });
      },
      // 构造表格数据
      setTableData (response) {
        if (response && response.length !== 0) {
          response.forEach((item) => {
            let row = {};
            for (let key in item) {
              row[key] = item[key];
            }
            this.tableData.push(row);
          });
        }

      }
    },
    mounted () {
      this.getCityInfo();
      console.log(this.$refs);
    }
  };
</script>

<style lang="less" scoped>
</style>
