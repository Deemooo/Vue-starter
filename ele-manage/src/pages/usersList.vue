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
            {key: 'registe_time', title: '注册日期', align: 'center', minWidth: 100},
            {key: 'username', title: '用户姓名', align: 'center', minWidth: 100},
            {key: 'city', title: '注册地址', align: 'center', minWidth: 100}
          ],
          tableData: [],
          tableLoading: false,
          pageIndex: 0,
          pageSize: 20,
          tableTotal: 0
        };
      },
    methods: {
      getTableData () {
        let params = this.setStrOfUrl({
          offset: this.pageIndex,
          limit: this.pageSize
        });
        this.https({url: '/v1/users/list?' + params, method: 'get'}, (response) => {
          if (response) {
            this.getTableDataTotal();
            this.setTableData(response);
          }
        });
      },
      getTableDataTotal () {
        this.https({url: '/v1/users/count', method: 'get'}, (response) => {
          if (response.status === 1) {
            this.tableTotal = response.count;
          }
        });
      },
      setTableData (response) {
        if (response && response.length !== 0) {
          response.forEach((item) => {
            let row = {
              username: item.username,
              registe_time: item.registe_time,
              city: item.city
            };
            this.tableData.push(row);
          });
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
