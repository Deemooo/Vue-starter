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
          {key: 'user_name', title: '用户名', align: 'center', minWidth: 100},
          {key: 'create_time', title: '注册日期', align: 'center', minWidth: 100},
          {key: 'city', title: '所在地', align: 'center', minWidth: 100},
          {key: 'admin', title: '权限', align: 'center', minWidth: 100}
        ],
        tableData: [],
        tableLoading: false,
        pageIndex: 0,
        pageSize: 20,
        tableTotal: 0
      };
    },
    methods: {
      // 获取表格数据
      getTableData () {
        let params = this.setStrOfUrl({
          offset: this.pageIndex,
          limit: this.pageSize
        });
        this.https({url: '/admin/all?' + params, method: 'get'}, (response) => {
          if (response) {
            this.getTableDataTotal();
            this.setTableData(response.data);
          }
        });
      },
      // 获取总数
      getTableDataTotal () {
        this.https({url: '/admin/count', method: 'get'}, (response) => {
          if (response.status === 1) {
            this.tableTotal = response.count;
          }
        });
      },
      // 构造表格数据
      setTableData (response) {
        if (response && response.length !== 0) {
          let arr = [];
          response.forEach((item) => {
            let row = {};
            for (let key in item) {
              row[key] = item[key];
            }
            arr.push(row);
          });
          this.tableData = arr;
        }
      }
    },
    mounted () {
      this.getTableData();
    }
  };
</script>

<style lang="less" scoped>
</style>
