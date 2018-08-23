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
                h('Row', {
                  style: {
                    width: 'calc(100% - 50px)',
                    height: '100%',
                    padding: '10px',
                    fontSize: '1.1em'
                  }
                }, [
                  h('Col', {
                    props: {
                      span: 8
                    },
                    style: {
                      textAlign: 'center'
                    }
                  }, [
                    h('span', {
                      style: {
                        fontWeight: '700'
                      }
                    }, '用户名：'),
                    h('span', params.row.user_name)
                  ]),
                  h('Col', {
                    props: {
                      span: 8
                    },
                    style: {
                      textAlign: 'center'
                    }
                  }, [
                    h('span', {
                      style: {
                        fontWeight: '700'
                      }
                    }, '店铺名称：'),
                    h('span', params.row.restaurant_name)
                  ]),
                  h('Col', {
                    props: {
                      span: 8
                    },
                    style: {
                      textAlign: 'center'
                    }
                  }, [
                    h('span', {
                      style: {
                        fontWeight: '700'
                      }
                    }, '收货地址：'),
                    h('span', params.row.address)
                  ])
                ]),
                h('Row', {
                  style: {
                    width: 'calc(100% - 50px)',
                    height: '100%',
                    padding: '10px',
                    fontSize: '1.1em'
                  }
                }, [
                  h('Col', {
                    props: {
                      span: 8
                    },
                    style: {
                      textAlign: 'center'
                    }
                  }, [
                    h('span', {
                      style: {
                        fontWeight: '700'
                      }
                    }, '店铺ID：'),
                    h('span', params.row.restaurant_id)
                  ]),
                  h('Col', {
                    props: {
                      span: 8
                    },
                    style: {
                      textAlign: 'center'
                    }
                  }, [
                    h('span', {
                      style: {
                        fontWeight: '700'
                      }
                    }, '店铺地址：'),
                    h('span', params.row.restaurant_address)
                  ])
                ])
              ]);
            }
          },
          {key: 'id', title: '订单ID', align: 'center', minWidth: 100},
          {key: 'total_amount', title: '总价格', align: 'center', minWidth: 100},
          {key: 'status', title: '订单状态', align: 'center', minWidth: 100}
        ],
        tableData: [],
        tableLoading: false,
        pageIndex: 0,
        pageSize: 20,
        tableTotal: 0,
        restaurantId: ''
      };
    },
    methods: {
      // 获取表格数据
      getTableData () {
        let params = this.setStrOfUrl({
          restaurant_id: this.restaurantId,
          offset: this.pageIndex,
          limit: this.pageSize
        });
        this.https({url: '/bos/orders?' + params, method: 'get'}, (response) => {
          if (response) {
            this.getTableDataTotal();
            this.setTableData(response);
          }
        });
      },
      // 获取总数
      getTableDataTotal () {
        this.https({url: '/bos/orders/count?restaurant_id=' + this.restaurantId, method: 'get'}, (response) => {
          if (response.status === 1) {
            this.tableTotal = response.count;
          }
        });
      },
      // 构造表格数据
      setTableData (response) {
        if (response && response.length !== 0) {
          let arr = [];
          console.log('response', response);
          response.forEach((item, index) => {
            let row = {};
            for (let key in item) {
              row[key] = item[key];
              row['status'] = item.status_bar.title;
              row['index'] = index;
            }
            arr.push(row);
          });
          this.tableData = arr;
        }
      }
    },
    mounted () {
      this.restaurantId = this.$route.query.restaurantId || '';
      this.getTableData();
    }
  };
</script>

<style lang="less" scoped>
</style>
